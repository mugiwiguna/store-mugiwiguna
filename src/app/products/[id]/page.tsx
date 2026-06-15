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
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px] text-notion-gray mb-6">
        <Link href="/" className="hover:text-notion-black transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-notion-black transition-colors">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-notion-black truncate max-w-[240px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <div className="aspect-square bg-surface border border-notion-border rounded overflow-hidden flex items-center justify-center text-notion-gray/30">
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-xl font-medium text-notion-black leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex gap-px">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-warning text-warning"
                      : "text-notion-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-[13px] text-notion-gray">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-xl font-medium text-notion-black">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-notion-gray line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs font-medium text-accent">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-sm text-notion-gray leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-[13px] font-medium text-notion-black mb-2">
                Color <span className="font-normal text-notion-gray">{selectedColor?.name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border transition-all ${
                      selectedColor?.name === color.name
                        ? "border-notion-black ring-2 ring-white"
                        : "border-notion-border hover:border-notion-gray"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.name} className="mb-5">
              <p className="text-[13px] font-medium text-notion-black mb-2">{variant.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant(option)}
                    className={`h-8 px-3 border rounded text-[13px] font-medium transition-colors ${
                      selectedVariant === option
                        ? "bg-notion-black text-white border-notion-black"
                        : "bg-white border-notion-border text-notion-black hover:border-notion-gray"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-[13px] font-medium text-notion-black mb-2">Quantity</p>
            <div className="inline-flex items-center border border-notion-border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-[13px] text-warning mt-1.5">Only {product.stock} left in stock</p>
            )}
            {product.stock === 0 && (
              <p className="text-[13px] text-error mt-1.5">Out of stock</p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded || product.stock === 0}
            className={`w-full h-9 text-sm font-medium rounded transition-colors ${
              isAdded
                ? "bg-success text-white"
                : product.stock === 0
                ? "bg-notion-border text-notion-gray cursor-not-allowed"
                : "bg-notion-black text-white hover:bg-notion-black/85"
            }`}
          >
            {isAdded ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Divider */}
          <hr className="my-6 border-notion-border" />

          {/* Details - inline, simple, no accordion */}
          <div className="space-y-4">
            <div>
              <h3 className="text-[13px] font-medium text-notion-black mb-1">Description</h3>
              <p className="text-sm text-notion-gray leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-notion-black mb-1">Details</h3>
              <ul className="text-sm text-notion-gray space-y-1">
                <li>Category: {product.category}</li>
                <li>Rating: {product.rating}/5 ({product.reviewCount} reviews)</li>
                <li>Stock: {product.stock} units</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-notion-black mb-1">Shipping & Returns</h3>
              <ul className="text-sm text-notion-gray space-y-1">
                <li>Free shipping on orders over Rp 500.000</li>
                <li>Standard delivery: 2-5 business days</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
