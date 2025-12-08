import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding/Image section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#333333]" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <Link href="/" className="mb-8">
            <svg
              className="w-16 h-16 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.494-.453-1.094-.407-1.8.046-.706.258-1.477.635-2.313.753-1.666 2.039-3.317 3.859-4.953L7.2 3.4c-.333.266-.666.533-1 .8-1.333 1.067-2.333 2.133-3 3.2-.667 1.067-1 2.133-1 3.2 0 .533.133 1 .4 1.4.267.4.667.6 1.2.6.533 0 1.2-.2 2-.6l16.2-6.8L24 7.8z" />
            </svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Nike</h1>
          <p className="text-lg text-gray-300 text-center max-w-md">
            Join us to get exclusive access to the latest products, member-only offers, and more.
          </p>
        </div>
      </div>

      {/* Right side - Auth form section */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile header with logo */}
        <div className="lg:hidden flex items-center justify-center py-8 bg-white border-b border-[#e5e5e5]">
          <Link href="/">
            <svg
              className="w-12 h-12 fill-[#111111]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.494-.453-1.094-.407-1.8.046-.706.258-1.477.635-2.313.753-1.666 2.039-3.317 3.859-4.953L7.2 3.4c-.333.266-.666.533-1 .8-1.333 1.067-2.333 2.133-3 3.2-.667 1.067-1 2.133-1 3.2 0 .533.133 1 .4 1.4.267.4.667.6 1.2.6.533 0 1.2-.2 2-.6l16.2-6.8L24 7.8z" />
            </svg>
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-white">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 px-4 text-center text-sm text-[#555555] bg-white border-t border-[#e5e5e5]">
          <p>&copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-[#111111] transition-colors">
              Terms of Use
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-[#111111] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
