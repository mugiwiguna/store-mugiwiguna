"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
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

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="bg-white border border-notion-border rounded-lg overflow-hidden transition-all hover:border-notion-border-hover hover:shadow-hover">
        {/* Image */}
        <div className="relative aspect-square bg-surface overflow-hidden">
          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-notion-gray/40">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[11px] font-medium rounded text-white bg-accent">
              {product.badge === "sale"
                ? `-${Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%`
                : product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
            className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 ${
              isWishlisted ? "text-error" : "text-notion-gray"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <p className="text-[11px] text-notion-gray mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-notion-black leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-px">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-warning text-warning"
                      : "text-notion-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-notion-gray">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm font-semibold text-notion-black">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-notion-gray line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Stock */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-[11px] text-warning mb-2">Only {product.stock} left</p>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full h-8 text-xs font-medium rounded transition-colors ${
              isAdded
                ? "bg-success text-white"
                : "bg-notion-black text-white hover:bg-notion-black/80"
            }`}
          >
            {isAdded ? "Added!" : "Add to cart"}
          </button>
        </div>
      </article>
    </Link>
  );
}
