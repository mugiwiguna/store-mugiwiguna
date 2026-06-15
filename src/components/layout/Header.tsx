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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-tight whitespace-nowrap">
            store<span className="font-normal text-gray-400">.mugiwiguna.dev</span>
          </Link>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Products
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link
                href="/sign-in"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Sign in
              </Link>
            )}
            <button
              onClick={openCart}
              className="relative p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-[4px] shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Products</Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Cart</Link>
              {!isSignedIn && (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">Sign in</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
