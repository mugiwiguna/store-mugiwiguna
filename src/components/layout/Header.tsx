"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { UserButton, useAuth } from "@clerk/nextjs";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-notion-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link href="/" className="text-base font-medium text-notion-black whitespace-nowrap">
            store<span className="font-normal text-notion-gray">.mugiwiguna.dev</span>
          </Link>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-notion-gray pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-4 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/60 focus:outline-none focus:border-notion-black transition-colors"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {isSignedIn ? (
              <div className="hidden sm:block mr-1">
                <UserButton />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              >
                <User className="w-4 h-4" />
                Sign in
              </Link>
            )}
            <button
              onClick={openCart}
              className="relative p-2 text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-0.5">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-notion-border py-3">
            <nav className="flex flex-col gap-0.5">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/sign-in", label: "Sign in" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
