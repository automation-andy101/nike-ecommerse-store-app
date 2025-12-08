"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcryptjs";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { user, account, session, guest } from "@/lib/db/schema";

const GUEST_SESSION_COOKIE = "guest_session";
const AUTH_SESSION_COOKIE = "auth_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").optional(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export type ActionResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function signUp(
  input: SignUpInput
): Promise<ActionResult<{ userId: string }>> {
  try {
    const validatedInput = signUpSchema.parse(input);

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, validatedInput.email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const hashedPassword = await hash(validatedInput.password, 12);

    const [newUser] = await db
      .insert(user)
      .values({
        name: validatedInput.name || null,
        email: validatedInput.email,
        emailVerified: false,
      })
      .returning();

    await db.insert(account).values({
      userId: newUser.id,
      accountId: newUser.id,
      providerId: "credentials",
      password: hashedPassword,
    });

    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000);

    await db.insert(session).values({
      userId: newUser.id,
      token: sessionToken,
      expiresAt,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    await mergeGuestCartWithUserCart(newUser.id);

    return {
      success: true,
      data: { userId: newUser.id },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed",
      };
    }
    console.error("Sign up error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during sign up",
    };
  }
}

export async function signIn(
  input: SignInInput
): Promise<ActionResult<{ userId: string }>> {
  try {
    const validatedInput = signInSchema.parse(input);

    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, validatedInput.email))
      .limit(1);

    if (!existingUser) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const [userAccount] = await db
      .select()
      .from(account)
      .where(
        and(
          eq(account.userId, existingUser.id),
          eq(account.providerId, "credentials")
        )
      )
      .limit(1);

    if (!userAccount || !userAccount.password) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const isPasswordValid = await compare(
      validatedInput.password,
      userAccount.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000);

    await db.insert(session).values({
      userId: existingUser.id,
      token: sessionToken,
      expiresAt,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    await mergeGuestCartWithUserCart(existingUser.id);

    return {
      success: true,
      data: { userId: existingUser.id },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed",
      };
    }
    console.error("Sign in error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during sign in",
    };
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

    if (sessionToken) {
      await db.delete(session).where(eq(session.token, sessionToken));
    }

    cookieStore.delete(AUTH_SESSION_COOKIE);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during sign out",
    };
  }
}

export async function guestSession(): Promise<
  ActionResult<{ guestId: string; sessionToken: string } | null>
> {
  try {
    const cookieStore = await cookies();
    const guestSessionToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

    if (!guestSessionToken) {
      return {
        success: true,
        data: null,
      };
    }

    const [existingGuest] = await db
      .select()
      .from(guest)
      .where(
        and(
          eq(guest.sessionToken, guestSessionToken),
          gt(guest.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!existingGuest) {
      cookieStore.delete(GUEST_SESSION_COOKIE);
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: {
        guestId: existingGuest.id,
        sessionToken: existingGuest.sessionToken,
      },
    };
  } catch (error) {
    console.error("Guest session error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while checking guest session",
    };
  }
}

export async function createGuestSession(): Promise<
  ActionResult<{ guestId: string; sessionToken: string }>
> {
  try {
    const cookieStore = await cookies();
    
    const existingGuestToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;
    if (existingGuestToken) {
      const [existingGuest] = await db
        .select()
        .from(guest)
        .where(
          and(
            eq(guest.sessionToken, existingGuestToken),
            gt(guest.expiresAt, new Date())
          )
        )
        .limit(1);

      if (existingGuest) {
        return {
          success: true,
          data: {
            guestId: existingGuest.id,
            sessionToken: existingGuest.sessionToken,
          },
        };
      }
    }

    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000);

    const [newGuest] = await db
      .insert(guest)
      .values({
        sessionToken,
        expiresAt,
      })
      .returning();

    cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return {
      success: true,
      data: {
        guestId: newGuest.id,
        sessionToken: newGuest.sessionToken,
      },
    };
  } catch (error) {
    console.error("Create guest session error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while creating guest session",
    };
  }
}

export async function mergeGuestCartWithUserCart(
  _userId: string
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const guestSessionToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

    if (!guestSessionToken) {
      return {
        success: true,
      };
    }

    const [existingGuest] = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionToken))
      .limit(1);

    if (!existingGuest) {
      cookieStore.delete(GUEST_SESSION_COOKIE);
      return {
        success: true,
      };
    }

    // TODO: When cart tables are implemented, migrate guest cart items to user cart here
    // using _userId to associate the cart items with the authenticated user

    await db.delete(guest).where(eq(guest.id, existingGuest.id));

    cookieStore.delete(GUEST_SESSION_COOKIE);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Merge guest cart error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while merging cart",
    };
  }
}

export async function getCurrentUser(): Promise<
  ActionResult<{
    id: string;
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
  } | null>
> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

    if (!sessionToken) {
      return {
        success: true,
        data: null,
      };
    }

    const [existingSession] = await db
      .select()
      .from(session)
      .where(
        and(eq(session.token, sessionToken), gt(session.expiresAt, new Date()))
      )
      .limit(1);

    if (!existingSession) {
      cookieStore.delete(AUTH_SESSION_COOKIE);
      return {
        success: true,
        data: null,
      };
    }

    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, existingSession.userId))
      .limit(1);

    if (!existingUser) {
      cookieStore.delete(AUTH_SESSION_COOKIE);
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        emailVerified: existingUser.emailVerified,
        image: existingUser.image,
      },
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while getting current user",
    };
  }
}

export async function requireAuth(redirectTo: string = "/auth/signin"): Promise<{
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
}> {
  const result = await getCurrentUser();

  if (!result.success || !result.data) {
    redirect(redirectTo);
  }

  return result.data;
}

export async function getOrCreateGuestSession(): Promise<
  ActionResult<{ guestId: string; sessionToken: string }>
> {
  const existingSession = await guestSession();

  if (existingSession.success && existingSession.data) {
    return {
      success: true,
      data: existingSession.data,
    };
  }

  return createGuestSession();
}
