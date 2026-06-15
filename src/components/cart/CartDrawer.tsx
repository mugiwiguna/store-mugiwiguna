"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <>
      <div className={`fixed inset-0 bg-black/30 z-[200] transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={closeCart} />
      <aside className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[var(--bg-surface)] z-[201] flex flex-col transition-transform duration-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold tracking-tight">Cart ({items.length})</h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pt-16">
              <ShoppingBag className="w-10 h-10 text-[var(--text-secondary)]/40 mb-4" />
              <p className="text-sm font-medium mb-1">Your cart is empty</p>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Add products to get started.</p>
              <button onClick={closeCart} className="h-9 px-5 text-sm font-medium text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-[var(--bg-hover)] flex-shrink-0 flex items-center justify-center text-[var(--text-secondary)]/30">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium leading-snug mb-0.5">{item.name}</h4>
                      {item.variant && <p className="text-[12px] text-[var(--text-secondary)] mb-1">{item.variant}</p>}
                      <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-[var(--border)]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
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

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--text-secondary)] mb-4">
              <span>Shipping</span>
              <span>At checkout</span>
            </div>
            <hr className="border-[var(--border)] mb-4" />
            <div className="flex justify-between text-sm font-semibold mb-4">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center h-11 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
              Checkout
            </Link>
            <button onClick={closeCart} className="w-full mt-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
