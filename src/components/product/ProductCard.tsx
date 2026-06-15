"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOnSale = !!product.originalPrice;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="bg-[var(--bg-surface)] border border-[var(--border)] transition-colors hover:border-[var(--border-hover)]">
        {/* Image */}
        <div className="aspect-square bg-[var(--bg-hover)] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-secondary)]/30">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          {(isOnSale || product.badge === "new") && (
            <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white bg-[var(--text-primary)]">
              {isOnSale ? "SALE" : "NEW"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[11px] text-[var(--text-secondary)] tracking-wider uppercase mb-1.5">{product.category}</p>
          <h3 className="text-sm font-medium text-[var(--text-primary)] leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-secondary)] line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
