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
    <header className="sticky top-0 z-50 bg-white border-b border-notion-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-12 gap-4">
          {/* Logo */}
          <Link href="/" className="text-sm font-medium text-notion-black whitespace-nowrap">
            store<span className="font-normal text-notion-gray">.mugiwiguna.dev</span>
          </Link>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-notion-gray pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-8 pl-8 pr-3 bg-surface border border-notion-border rounded text-[13px] placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            <Link href="/" className="px-2.5 py-1 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-2.5 py-1 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors">
              Products
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            {isSignedIn ? (
              <div className="w-7 h-7 flex items-center justify-center">
                <UserButton />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-2.5 py-1 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              >
                Sign in
              </Link>
            )}
            <button
              onClick={openCart}
              className="relative p-1.5 text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-accent text-white text-[10px] font-medium rounded-full flex items-center justify-center px-[3px]">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-notion-border py-2">
            <div className="flex flex-col gap-0.5">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-2 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-2 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors">Products</Link>
              {!isSignedIn && (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-2 text-[13px] text-notion-gray hover:text-notion-black hover:bg-hover rounded transition-colors">Sign in</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
