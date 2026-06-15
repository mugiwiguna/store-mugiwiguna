"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-[var(--text-placeholder)] mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products" className="btn btn--primary btn--lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[var(--border-default)] rounded-xl overflow-hidden">
            <div className="divide-y divide-[var(--border-default)]">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 bg-[var(--bg-surface)] rounded-lg flex-shrink-0" />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {item.variant}
                        </p>
                      )}
                      <p className="font-semibold">{formatPrice(item.price)}</p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-[var(--border-default)] rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subtotal + Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border border-[var(--border-default)] rounded-xl p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Shipping</span>
                <span className="text-[var(--text-secondary)]">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[var(--border-default)] mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-lg">{formatPrice(getTotalPrice())}</span>
            </div>

            <Link href="/checkout" className="btn btn--primary btn--lg btn--full">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
