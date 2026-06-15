"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <Link href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Continue Shopping →</Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{item.name}</h3>
                          {item.variant && <p className="text-xs text-gray-500 mb-1">{item.variant}</p>}
                          <p className="text-base font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({items.length} items)</span>
                <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center h-12 w-full bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link href="/products" className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
