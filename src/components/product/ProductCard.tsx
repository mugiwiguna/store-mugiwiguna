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
      <article className="bg-white border border-notion-border rounded overflow-hidden transition-colors hover:border-notion-border-hover">
        {/* Image */}
        <div className="aspect-square bg-surface relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-notion-gray/30">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>

          {isOnSale && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-medium text-white bg-accent rounded">
              SALE
            </span>
          )}
          {product.badge === "new" && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-medium text-white bg-notion-black rounded">
              NEW
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-[11px] text-notion-gray mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-notion-black leading-snug mb-1.5 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-medium text-notion-black">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-notion-gray line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
