"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

type Step = "shipping" | "payment" | "confirm";

const steps = [
  { id: "shipping" as Step, label: "Shipping" },
  { id: "payment" as Step, label: "Payment" },
  { id: "confirm" as Step, label: "Review" },
];

const paymentMethods = [
  { id: "bank", name: "Bank Transfer", desc: "BCA, Mandiri, BNI, BRI", fee: 0 },
  { id: "ewallet", name: "E-Wallet", desc: "OVO, GoPay, Dana", fee: 0 },
  { id: "card", name: "Credit Card", desc: "Visa, Mastercard", fee: 0.025 },
  { id: "cod", name: "Cash on Delivery", desc: "Available for selected areas", fee: 25000 },
];

const shippingMethods = [
  { id: "standard", name: "Standard", eta: "2-5 days", price: 0, minOrder: 500000 },
  { id: "express", name: "Express", eta: "1-2 days", price: 35000, minOrder: 0 },
];

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const { items, getTotalPrice } = useCartStore();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const totalPrice = getTotalPrice();
  const shipping = shippingMethods.find((s) => s.id === selectedShipping)!;
  const payment = paymentMethods.find((p) => p.id === selectedPayment)!;
  const shippingCost = shipping.price === 0 ? 0 : shipping.price;
  const paymentFee = typeof payment.fee === "number" && payment.fee >= 1 ? payment.fee : Math.round(totalPrice * (payment.fee as number));
  const grandTotal = totalPrice + shippingCost + paymentFee;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <div className="container pt-20 pb-32 text-center max-w-sm mx-auto">
        <ShoppingBag className="w-12 h-12 text-[var(--text-secondary)]/30 mx-auto mb-5" />
        <h1 className="text-lg font-semibold tracking-tight mb-2">Your cart is empty</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Add items before checking out.</p>
        <Link href="/products" className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container pt-10 pb-24">
      {user && (
        <div className="text-[13px] text-[var(--text-secondary)] mb-6 px-4 py-3 border border-[var(--border)]">
          Signed in as <span className="font-semibold text-[var(--text-primary)]">{user.emailAddresses[0]?.emailAddress}</span>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center gap-3 mb-8 text-sm">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-3">
            <span className={i <= currentStepIndex ? "font-semibold" : "text-[var(--text-secondary)]"}>{step.label}</span>
            {i < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-[var(--border)]" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="border border-[var(--border)] p-6">
            {/* SHIPPING */}
            {currentStep === "shipping" && (
              <>
                <h2 className="text-sm font-semibold mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium mb-1">First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium mb-1">Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium mb-1">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium mb-1">Phone</label>
                    <input name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" placeholder="+62 812 3456 7890" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium mb-1">Address</label>
                    <input name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium mb-1">City</label>
                      <input name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium mb-1">Postal Code</label>
                      <input name="postalCode" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        className="w-full h-10 px-3 bg-[var(--bg-page)] border-0 text-sm" />
                    </div>
                  </div>
                  <hr className="border-[var(--border)] my-4" />
                  <div>
                    <h3 className="text-[13px] font-semibold mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      {shippingMethods.map((m) => (
                        <label key={m.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${selectedShipping === m.id ? "border-[var(--text-primary)]" : "border-[var(--border)] hover:border-[var(--text-secondary)]"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 border flex items-center justify-center ${selectedShipping === m.id ? "border-[var(--text-primary)]" : "border-[var(--border)]"}`}>
                              {selectedShipping === m.id && <div className="w-2 h-2 bg-[var(--text-primary)]" />}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{m.name}</div>
                              <div className="text-[13px] text-[var(--text-secondary)]">{m.eta}</div>
                            </div>
                          </div>
                          <div className="text-sm font-semibold">{m.price === 0 ? formatPrice(0) : formatPrice(m.price)}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentStep("payment")} className="mt-6 w-full h-11 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">
                  Continue to Payment
                </button>
              </>
            )}

            {/* PAYMENT */}
            {currentStep === "payment" && (
              <>
                <h2 className="text-sm font-semibold mb-6">Payment Method</h2>
                <div className="space-y-2 mb-6">
                  {paymentMethods.map((m) => (
                    <label key={m.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${selectedPayment === m.id ? "border-[var(--text-primary)]" : "border-[var(--border)] hover:border-[var(--text-secondary)]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center ${selectedPayment === m.id ? "border-[var(--text-primary)]" : "border-[var(--border)]"}`}>
                          {selectedPayment === m.id && <div className="w-2 h-2 bg-[var(--text-primary)]" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-[13px] text-[var(--text-secondary)]">{m.desc}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">{!m.fee ? "Free" : typeof m.fee === "number" && m.fee >= 1 ? formatPrice(m.fee) : `${(m.fee as number) * 100}%`}</div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep("shipping")} className="h-11 px-6 text-sm font-medium border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">Back</button>
                  <button onClick={() => setCurrentStep("confirm")} className="flex-1 h-11 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">Review Order</button>
                </div>
              </>
            )}

            {/* CONFIRM */}
            {currentStep === "confirm" && (
              <>
                <h2 className="text-sm font-semibold mb-6">Review your order</h2>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="p-4 bg-[var(--bg-page)]">
                    <h3 className="text-[13px] font-semibold mb-1">Shipping To</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">{formData.firstName} {formData.lastName}<br />{formData.address}<br />{formData.city}, {formData.postalCode}<br />{formData.phone}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-[var(--bg-page)]">
                      <h3 className="text-[13px] font-semibold mb-1">Payment</h3>
                      <p className="text-[13px] text-[var(--text-secondary)]">{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                    </div>
                    <div className="flex-1 p-4 bg-[var(--bg-page)]">
                      <h3 className="text-[13px] font-semibold mb-1">Shipping</h3>
                      <p className="text-[13px] text-[var(--text-secondary)]">{shippingMethods.find(m => m.id === selectedShipping)?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep("payment")} className="h-11 px-6 text-sm font-medium border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">Back</button>
                  <button className="flex-1 h-11 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">Place Order &mdash; {formatPrice(grandTotal)}</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="border border-[var(--border)] p-6 sticky top-20">
            <h2 className="text-sm font-semibold mb-5">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-[var(--bg-hover)] flex-shrink-0 flex items-center justify-center text-[var(--text-secondary)]/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium line-clamp-1">{item.name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <hr className="border-[var(--border)] mb-3" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span></div>
              {paymentFee > 0 && <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Payment fee</span><span>{formatPrice(paymentFee)}</span></div>}
            </div>
            <hr className="border-[var(--border)] my-3" />
            <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
