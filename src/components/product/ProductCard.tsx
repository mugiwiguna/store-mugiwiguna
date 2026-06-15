"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="bg-white border border-[var(--border-default)] rounded-lg overflow-hidden transition-all duration-150 hover:border-[var(--border-hover)] hover:shadow-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[var(--bg-surface)] overflow-hidden">
          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-placeholder)]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded text-white ${
                product.badge === "new"
                  ? "bg-[var(--accent-primary)]"
                  : product.badge === "sale"
                  ? "bg-[var(--error)]"
                  : "bg-[var(--warning)]"
              }`}
            >
              {product.badge === "sale"
                ? `-${Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%`
                : product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm transition-all hover:scale-110 ${
              isWishlisted ? "text-[var(--error)]" : "text-[var(--text-secondary)]"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-[var(--text-secondary)]">
            {product.category}
          </span>
          <h3 className="text-base font-medium text-[var(--text-primary)] leading-tight mb-2 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-[var(--warning)] text-[var(--warning)]"
                      : "text-[var(--border-default)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[var(--text-secondary)]">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--text-placeholder)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-xs text-[var(--warning)] mb-3">
              Only {product.stock} left in stock
            </p>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`btn btn--primary btn--full btn--sm transition-all ${
              isAdded ? "bg-[var(--success)] hover:bg-[var(--success)]" : ""
            }`}
          >
            {isAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </article>
    </Link>
  );
}
