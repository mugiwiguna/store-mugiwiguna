"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Star, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getProductById, formatPrice } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openCart } = useCartStore();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const variant = selectedVariant ? `${selectedColor?.name || ""} / ${selectedVariant}`.trim() : selectedColor?.name;
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
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[240px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center text-gray-300 mb-4">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className={`w-20 h-20 bg-gray-100 border-2 rounded-xl transition-colors ${i === 1 ? "border-blue-600" : "border-transparent hover:border-gray-300"}`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <button onClick={() => setIsWishlisted(!isWishlisted)} className={`p-2.5 rounded-xl border transition-colors flex-shrink-0 ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2.5">
                Color: <span className="font-normal text-gray-500">{selectedColor?.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button key={color.name} onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${selectedColor?.name === color.name ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"}`}
                    style={{ backgroundColor: color.hex }} title={color.name} />
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.name} className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2.5">{variant.name}</p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <button key={option} onClick={() => setSelectedVariant(option)}
                    className={`h-10 px-5 border text-sm font-medium rounded-xl transition-all ${
                      selectedVariant === option
                        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}>{option}</button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-200 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 text-center font-semibold text-gray-900">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleAddToCart} disabled={isAdded || product.stock === 0}
              className={`flex-1 h-12 text-sm font-bold rounded-xl transition-all shadow-sm ${
                isAdded ? "bg-green-600 text-white" : product.stock === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
              }`}>
              {isAdded ? "✓ Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-sm text-orange-600 font-medium mb-6">Only {product.stock} left in stock — order soon</p>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-gray-50 rounded-xl">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Secure Payment</span>
            </div>
          </div>

          {/* Details */}
          <hr className="border-gray-200 mb-6" />
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Product Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating}/5 ({product.reviewCount} reviews)</p>
                <p>Stock: {product.stock > 0 ? `${product.stock} units available` : "Out of stock"}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Shipping & Returns</h3>
              <div className="text-sm text-gray-600 space-y-1">
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
