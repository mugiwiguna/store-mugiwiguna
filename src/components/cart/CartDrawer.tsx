"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[201] flex flex-col transition-transform duration-300 ease-out shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-notion-border">
          <h2 className="text-base font-semibold text-notion-black">
            Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pt-12">
              <ShoppingBag className="w-10 h-10 text-notion-gray/50 mb-3" />
              <p className="text-sm font-medium text-notion-black mb-1">Your cart is empty</p>
              <p className="text-xs text-notion-gray mb-5">Add products to get started.</p>
              <button
                onClick={closeCart}
                className="h-8 px-4 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-notion-border">
              {items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-16 h-16 bg-surface rounded flex-shrink-0 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-notion-gray/40" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-notion-black leading-snug line-clamp-2 mb-0.5">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <p className="text-[11px] text-notion-gray mb-1">{item.variant}</p>
                      )}
                      <p className="text-sm font-semibold text-notion-black">{formatPrice(item.price)}</p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity */}
                        <div className="flex items-center border border-notion-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-notion-gray hover:text-error transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-notion-border bg-white">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-notion-gray">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-notion-gray mb-4">
              <span>Shipping</span>
              <span>At checkout</span>
            </div>
            <div className="flex justify-between text-base font-semibold mb-4 pt-3 border-t border-notion-border">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center h-9 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="w-full mt-2 text-xs text-accent hover:text-accent-hover transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}