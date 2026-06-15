"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border-default)]">
      <div className="container">
        <div className="flex items-center justify-between h-14 gap-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold whitespace-nowrap">
            store<span className="font-normal text-[var(--text-secondary)]">.mugiwiguna.dev</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-placeholder)]" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-full text-sm transition-colors focus:outline-none focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--accent-subtle)]"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Products
            </Link>
            <Link href="/products?category=Fashion" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Fashion
            </Link>
            <Link href="/products?category=Electronics" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Electronics
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="md:hidden btn btn--ghost p-2" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="btn btn--ghost p-2 hidden md:flex" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>
            <button className="btn btn--ghost p-2" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={openCart}
              className="btn btn--ghost p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[var(--accent-primary)] text-white text-[11px] font-semibold rounded-full flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn btn--ghost p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border-default)] py-4">
            <nav className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                Home
              </Link>
              <Link href="/products" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                Products
              </Link>
              <Link href="/products?category=Fashion" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                Fashion
              </Link>
              <Link href="/products?category=Electronics" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors">
                Electronics
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
