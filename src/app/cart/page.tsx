"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-20">
        <div className="text-center max-w-sm mx-auto">
          <ShoppingBag className="w-12 h-12 text-notion-gray/30 mx-auto mb-4" />
          <h1 className="text-lg font-medium text-notion-black mb-1.5">Your cart is empty</h1>
          <p className="text-sm text-notion-gray mb-5">
            Looks like you haven't added anything yet.
          </p>
          <Link href="/products" className="inline-flex items-center justify-center h-9 px-5 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-lg font-medium text-notion-black mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-notion-border rounded overflow-hidden">
            <div className="divide-y divide-notion-border">
              {items.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-surface rounded flex-shrink-0 flex items-center justify-center text-notion-gray/30">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-notion-black mb-1">{item.name}</h3>
                      {item.variant && (
                        <p className="text-[13px] text-notion-gray mb-1.5">{item.variant}</p>
                      )}
                      <p className="text-sm font-medium">{formatPrice(item.price)}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-notion-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-notion-gray hover:text-error transition-colors"
                          >
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
          <Link href="/products" className="inline-flex items-center gap-1 mt-4 text-[13px] text-accent hover:text-accent-hover transition-colors">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border border-notion-border rounded p-5 sticky top-16">
            <h2 className="text-sm font-medium text-notion-black mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-notion-gray">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-notion-gray">Shipping</span>
              <span className="text-notion-gray text-[13px]">At checkout</span>
            </div>
            <hr className="border-notion-border mb-3" />
            <div className="flex justify-between text-sm font-medium mb-5">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link
              href="/checkout"
              className="flex items-center justify-center h-9 text-sm font-medium text-white bg-notion-black hover:bg-notion-black/85 rounded transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
