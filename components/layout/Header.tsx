"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "@/components/auth/AuthButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-700 dark:border-neutral-600 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 - 터미널 스타일 */}
          <Link
            href="/"
            className="font-mono text-lg font-bold text-neutral-900 dark:text-neutral-100 hover:text-[#58a6ff] dark:hover:text-[#58a6ff] transition-colors"
          >
            <span className="text-[#7ee787]">~/</span>my-blog
            <span className="text-[#58a6ff] animate-pulse">$</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#58a6ff] dark:hover:text-[#58a6ff] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <AuthButton />
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <AuthButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-md border border-neutral-700 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-mono text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#58a6ff] dark:hover:text-[#58a6ff] transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
