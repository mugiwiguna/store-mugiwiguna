"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Star } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getProductById, formatPrice } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const variant = selectedVariant
      ? `${selectedColor?.name || ""} / ${selectedVariant}`.trim()
      : selectedColor?.name;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      variant,
      color: selectedColor?.name,
      size: selectedVariant || undefined,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container pt-10 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-[var(--text-primary)]">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text-primary)] truncate max-w-[240px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-[var(--bg-hover)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]/30">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight leading-tight mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex gap-px">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-[var(--text-primary)] text-[var(--text-primary)]" : "text-[var(--border)]"}`} />
              ))}
            </div>
            <span className="text-[13px] text-[var(--text-secondary)]">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-[var(--text-secondary)] line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">{product.description}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-[13px] font-semibold mb-2.5">Color <span className="font-normal text-[var(--text-secondary)]">{selectedColor?.name}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 border transition-all ${selectedColor?.name === color.name ? "border-[var(--text-primary)]" : "border-[var(--border)] hover:border-[var(--text-secondary)]"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.name} className="mb-6">
              <p className="text-[13px] font-semibold mb-2.5">{variant.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant(option)}
                    className={`h-9 px-4 text-sm font-medium border transition-colors ${
                      selectedVariant === option
                        ? "bg-[var(--text-primary)] text-white border-[var(--text-primary)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-[13px] font-semibold mb-2.5">Quantity</p>
            <div className="inline-flex items-center border border-[var(--border)]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-[13px] text-[var(--text-secondary)] mt-2">Only {product.stock} left in stock</p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded || product.stock === 0}
            className={`w-full h-11 text-sm font-semibold transition-opacity ${
              isAdded ? "bg-[var(--text-primary)] text-white" : product.stock === 0 ? "bg-[var(--border)] text-[var(--text-secondary)] cursor-not-allowed" : "bg-[var(--text-primary)] text-white hover:opacity-85"
            }`}
          >
            {isAdded ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Details */}
          <hr className="border-[var(--border)] my-8" />
          <div className="space-y-5">
            <div>
              <h3 className="text-[13px] font-semibold mb-1">Description</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold mb-1">Details</h3>
              <div className="text-sm text-[var(--text-secondary)] space-y-0.5">
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating}/5 ({product.reviewCount} reviews)</p>
                <p>Stock: {product.stock} units</p>
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold mb-1">Shipping & Returns</h3>
              <div className="text-sm text-[var(--text-secondary)] space-y-0.5">
                <p>Free shipping on orders over Rp 500.000</p>
                <p>Standard delivery: 2-5 business days</p>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
