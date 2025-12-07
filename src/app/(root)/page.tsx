import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        {/* Nike Logo */}
        <svg
          className="w-24 h-24 fill-[#111111]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.494-.453-1.094-.407-1.8.046-.706.258-1.477.635-2.313.753-1.666 2.039-3.317 3.859-4.953L7.2 3.4c-.333.266-.666.533-1 .8-1.333 1.067-2.333 2.133-3 3.2-.667 1.067-1 2.133-1 3.2 0 .533.133 1 .4 1.4.267.4.667.6 1.2.6.533 0 1.2-.2 2-.6l16.2-6.8L24 7.8z" />
        </svg>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#111111]">
            Nike Store
          </h1>
          <p className="text-lg text-[#555555] max-w-md">
            Shop the latest Nike shoes and apparel. Just Do It.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/sign-in"
            className="flex h-12 items-center justify-center rounded-full bg-[#111111] px-8 text-white font-medium hover:bg-[#333333] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="flex h-12 items-center justify-center rounded-full border border-[#111111] px-8 text-[#111111] font-medium hover:bg-[#f5f5f5] transition-colors"
          >
            Join Us
          </Link>
        </div>
      </main>
    </div>
  );
}
