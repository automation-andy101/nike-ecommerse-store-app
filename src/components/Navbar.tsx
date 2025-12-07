"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-light-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0" aria-label="Nike Home">
            <Image
              src="/logo.svg"
              alt="Nike Logo"
              width={60}
              height={22}
              className="w-12 md:w-15 invert"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center space-x-6">
            <button
              type="button"
              className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
              aria-label="Search"
            >
              Search
            </button>
            <Link
              href="/cart"
              className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
            >
              My Cart ({cartCount})
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-dark-900 hover:text-dark-700 hover:bg-light-200 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-light-300">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-body font-medium text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-light-300 pt-2 mt-2">
              <button
                type="button"
                className="block w-full text-left px-3 py-2 text-body font-medium text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors"
              >
                Search
              </button>
              <Link
                href="/cart"
                className="block px-3 py-2 text-body font-medium text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Cart ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
