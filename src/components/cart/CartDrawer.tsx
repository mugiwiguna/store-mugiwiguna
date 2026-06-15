"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-[200] transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={closeCart} />
      <aside className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[201] flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Shopping Cart ({items.length})</h2>
          <button onClick={closeCart} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pt-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-base font-semibold text-gray-900 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6">Add some products to get started.</p>
              <button onClick={closeCart} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5">{item.name}</h4>
                    {item.variant && <p className="text-xs text-gray-500 mb-1">{item.variant}</p>}
                    <p className="text-sm font-bold text-gray-900 mb-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-white">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">Shipping</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center h-12 w-full bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              Checkout
            </Link>
            <button onClick={closeCart} className="w-full mt-3 text-sm font-medium text-gray-500 hover:text-gray-900 text-center transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
