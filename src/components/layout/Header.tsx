"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { UserButton, useAuth } from "@clerk/nextjs";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          <Link href="/" className="text-sm font-semibold tracking-tight whitespace-nowrap">
            store.mugiwiguna.dev
          </Link>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-secondary)] pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-3 bg-[var(--bg-page)] border-0 text-[13px] placeholder:text-[var(--text-secondary)]/60"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-3 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
              Products
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            {isSignedIn ? (
              <div className="flex items-center justify-center">
                <UserButton />
              </div>
            ) : (
              <Link href="/sign-in" className="px-3 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
                Sign in
              </Link>
            )}
            <button
              onClick={openCart}
              className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-[var(--text-primary)] text-white text-[10px] font-semibold flex items-center justify-center px-[3px]">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] py-2">
            <div className="flex flex-col gap-0.5">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">Products</Link>
              {!isSignedIn && (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">Sign in</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
