"use client";

import { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const isSignUp = mode === "sign-up";
  const title = isSignUp ? "Become a Nike Member" : "Sign In";
  const subtitle = isSignUp
    ? "Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community."
    : "Enter your email and password to access your account.";
  const buttonText = isSignUp ? "Join Us" : "Sign In";
  const alternateText = isSignUp
    ? "Already a Member?"
    : "Not a Member?";
  const alternateLink = isSignUp ? "/sign-in" : "/sign-up";
  const alternateLinkText = isSignUp ? "Sign In" : "Join Us";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement auth logic
    console.log("Form submitted", { email, password, firstName, lastName });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#111111] mb-2">{title}</h1>
        <p className="text-sm text-[#555555] max-w-sm mx-auto">{subtitle}</p>
      </div>

      {/* Social Providers */}
      <SocialProviders action={mode} />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e5e5e5]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-[#555555]">or</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full rounded-md border border-[#d4d4d4] bg-white px-4 py-3 text-[#111111] placeholder:text-[#a3a3a3] focus:border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors"
                aria-label="First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full rounded-md border border-[#d4d4d4] bg-white px-4 py-3 text-[#111111] placeholder:text-[#a3a3a3] focus:border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors"
                aria-label="Last Name"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-md border border-[#d4d4d4] bg-white px-4 py-3 text-[#111111] placeholder:text-[#a3a3a3] focus:border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors"
            aria-label="Email address"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-[#d4d4d4] bg-white px-4 py-3 pr-12 text-[#111111] placeholder:text-[#a3a3a3] focus:border-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111] transition-colors"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#111111] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {isSignUp && (
          <div className="flex items-start gap-3">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#d4d4d4] text-[#111111] focus:ring-[#111111]"
              required
            />
            <label htmlFor="agreeToTerms" className="text-sm text-[#555555]">
              I agree to Nike&apos;s{" "}
              <Link href="/privacy" className="underline hover:text-[#111111]">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="underline hover:text-[#111111]">
                Terms of Use
              </Link>
              .
            </label>
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[#d4d4d4] text-[#111111] focus:ring-[#111111]"
              />
              <label htmlFor="remember" className="text-sm text-[#555555]">
                Keep me signed in
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#555555] underline hover:text-[#111111] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-[#111111] py-3 px-6 text-white font-medium hover:bg-[#333333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </form>

      {/* Alternate action */}
      <p className="text-center text-sm text-[#555555]">
        {alternateText}{" "}
        <Link
          href={alternateLink}
          className="font-medium text-[#111111] underline hover:no-underline"
        >
          {alternateLinkText}
        </Link>
      </p>
    </div>
  );
}
