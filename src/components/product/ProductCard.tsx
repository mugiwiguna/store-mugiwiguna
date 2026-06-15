"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        {/* Image */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>

          {/* Badge */}
          {(product.originalPrice || product.badge === "new") && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-md shadow-sm ${
              product.originalPrice
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white"
            }`}>
              {product.originalPrice
                ? `-${Math.round((1 - product.price / product.originalPrice) * 100)}%`
                : "NEW"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Stock warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-xs text-orange-500 font-medium mt-2">Only {product.stock} left</p>
          )}
        </div>
      </article>
    </Link>
  );
}
