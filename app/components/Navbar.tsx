"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-background border-b border-foreground/10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold">
            Bob Hotline
          </Link>
          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-foreground/5 focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="hidden sm:flex space-x-8">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="#about" className="hover:underline">
              About
            </Link>
            <Link href="#contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
      {open && (
        <div className="sm:hidden px-2 pb-4 pt-2 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md hover:bg-foreground/5">
            Home
          </Link>
          <Link href="#about" className="block px-3 py-2 rounded-md hover:bg-foreground/5">
            About
          </Link>
          <Link href="#contact" className="block px-3 py-2 rounded-md hover:bg-foreground/5">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
