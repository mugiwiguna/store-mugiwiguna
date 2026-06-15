"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Heart, Star, Truck, RotateCcw, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getProductById, formatPrice } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

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

  const accordionItems = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "specifications",
      title: "Specifications",
      content: `• Category: ${product.category}\n• Rating: ${product.rating}/5 (${product.reviewCount} reviews)\n• Stock: ${product.stock > 0 ? `${product.stock} units available` : "Out of stock"}`,
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: `• Free shipping on orders over Rp 500.000\n• Standard delivery: 2-5 business days\n• 30-day return policy\n• Items must be unused and in original packaging`,
    },
  ];

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
        <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-[var(--text-primary)]">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[var(--text-primary)]">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[var(--text-primary)] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-[var(--bg-surface)] rounded-xl flex items-center justify-center text-[var(--text-placeholder)]">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className={`w-20 h-20 bg-[var(--bg-surface)] rounded-lg border-2 transition-colors ${
                  i === 1 ? "border-[var(--accent-primary)]" : "border-transparent hover:border-[var(--border-hover)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-[var(--warning)] text-[var(--warning)]"
                      : "text-[var(--border-default)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[var(--text-secondary)]">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-[var(--text-placeholder)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="px-2 py-1 bg-[var(--error)] text-white text-xs font-semibold rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">
                Color: <span className="font-normal">{selectedColor?.name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor?.name === color.name
                        ? "border-[var(--text-primary)] ring-2 ring-white ring-offset-2"
                        : "border-transparent"
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
          {product.variants && product.variants.map((variant) => (
            <div key={variant.name} className="mb-6">
              <p className="text-sm font-medium mb-3">
                {variant.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant(option)}
                    className={`h-9 px-4 border rounded-md text-sm font-medium transition-all ${
                      selectedVariant === option
                        ? "bg-[var(--text-primary)] text-white border-[var(--text-primary)]"
                        : "bg-white border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-hover)]"
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
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="inline-flex items-center border border-[var(--border-default)] rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-[var(--warning)] mt-2">
                Only {product.stock} left in stock
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={isAdded || product.stock === 0}
              className={`btn btn--primary btn--lg flex-1 ${
                isAdded ? "bg-[var(--success)] hover:bg-[var(--success)]" : ""
              }`}
            >
              {isAdded ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`btn btn--lg w-12 border border-[var(--border-default)] ${
                isWishlisted ? "text-[var(--error)] border-[var(--error)]" : "text-[var(--text-secondary)]"
              } hover:border-[var(--border-hover)]`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-[var(--bg-surface)] rounded-lg">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="text-xs text-[var(--text-secondary)]">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RotateCcw className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="text-xs text-[var(--text-secondary)]">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Shield className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="text-xs text-[var(--text-secondary)]">Secure Payment</span>
            </div>
          </div>

          {/* Accordion */}
          <div className="border-t border-[var(--border-default)]">
            {accordionItems.map((item) => (
              <div key={item.id} className="border-b border-[var(--border-default)]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-4 text-sm font-medium text-left"
                >
                  {item.title}
                  {openAccordion === item.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openAccordion === item.id && (
                  <div className="pb-4 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
