"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container pt-20 pb-32 text-center max-w-sm mx-auto">
        <ShoppingBag className="w-12 h-12 text-[var(--text-secondary)]/30 mx-auto mb-5" />
        <h1 className="text-lg font-semibold tracking-tight mb-2">Your cart is empty</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container pt-10 pb-24">
      <h1 className="text-lg font-semibold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="border border-[var(--border)]">
            <div className="divide-y divide-[var(--border)]">
              {items.map((item) => (
                <div key={item.id} className="p-5">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[var(--bg-hover)] flex-shrink-0 flex items-center justify-center text-[var(--text-secondary)]/30">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-0.5">{item.name}</h3>
                      {item.variant && <p className="text-[13px] text-[var(--text-secondary)] mb-1.5">{item.variant}</p>}
                      <p className="text-sm font-semibold">{formatPrice(item.price)}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[var(--border)]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          <button onClick={() => removeItem(item.id)} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/products" className="inline-flex mt-4 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            &larr; Continue Shopping
          </Link>
        </div>

        <div>
          <div className="border border-[var(--border)] p-6 sticky top-20">
            <h2 className="text-sm font-semibold mb-5">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <span className="text-[var(--text-secondary)]">Shipping</span>
              <span className="text-[var(--text-secondary)] text-[13px]">At checkout</span>
            </div>
            <hr className="border-[var(--border)] mb-4" />
            <div className="flex justify-between text-sm font-semibold mb-6">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link href="/checkout" className="flex items-center justify-center h-11 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
