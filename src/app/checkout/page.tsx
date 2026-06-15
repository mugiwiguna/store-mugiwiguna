"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

type Step = "shipping" | "payment" | "confirm";

const steps: { id: Step; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Review" },
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

  const shippingCost = shipping.price === 0 && totalPrice >= shipping.minOrder ? 0 : shipping.price;
  const paymentFee = payment.fee && typeof payment.fee === "number"
    ? (payment.fee >= 1 ? payment.fee : Math.round(totalPrice * payment.fee))
    : 0;
  const grandTotal = totalPrice + shippingCost + paymentFee;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const isFreeShipping = shipping.id === "standard" && totalPrice >= 500000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center max-w-sm mx-auto">
        <ShoppingBag className="w-12 h-12 text-notion-gray/30 mx-auto mb-4" />
        <h1 className="text-lg font-medium text-notion-black mb-1.5">Your cart is empty</h1>
        <p className="text-sm text-notion-gray mb-5">Add some items before checking out.</p>
        <Link href="/products" className="inline-flex items-center justify-center h-9 px-5 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* User info */}
      {user && (
        <div className="text-[13px] text-notion-gray mb-4 px-4 py-2.5 bg-white border border-notion-border rounded">
          Signed in as <span className="font-medium text-notion-black">{user.emailAddresses[0]?.emailAddress}</span>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center gap-3 mb-6 text-[13px]">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-3">
            <span className={i <= currentStepIndex ? "text-notion-black font-medium" : "text-notion-gray"}>{step.label}</span>
            {i < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-notion-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-notion-border rounded p-6">

            {/* SHIPPING */}
            {currentStep === "shipping" && (
              <>
                <h2 className="text-sm font-medium text-notion-black mb-5">Shipping Information</h2>
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[13px] text-notion-black mb-1">First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={handleInputChange}
                        className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-notion-black mb-1">Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={handleInputChange}
                        className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-notion-black mb-1">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleInputChange}
                      className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-notion-black mb-1">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" placeholder="+62 812 3456 7890" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-notion-black mb-1">Address</label>
                    <input name="address" value={formData.address} onChange={handleInputChange}
                      className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[13px] text-notion-black mb-1">City</label>
                      <input name="city" value={formData.city} onChange={handleInputChange}
                        className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-notion-black mb-1">Postal Code</label>
                      <input name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                        className="w-full h-9 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/50 focus:outline-none focus:border-notion-black transition-colors" />
                    </div>
                  </div>

                  <hr className="border-notion-border my-2" />

                  {/* Shipping Method */}
                  <div>
                    <h3 className="text-[13px] font-medium text-notion-black mb-2">Shipping Method</h3>
                    <div className="space-y-2">
                      {shippingMethods.map((m) => (
                        <label key={m.id} className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                          selectedShipping === m.id ? "border-notion-black bg-selected" : "border-notion-border hover:border-notion-gray"
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedShipping === m.id ? "border-notion-black" : "border-notion-border"
                            }`}>
                              {selectedShipping === m.id && <div className="w-2 h-2 rounded-full bg-notion-black" />}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-notion-black">{m.name}</div>
                              <div className="text-[12px] text-notion-gray">{m.eta}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-notion-black">
                            {m.price === 0 && totalPrice >= m.minOrder ? (
                              <span className="text-accent">Free</span>
                            ) : (
                              m.price === 0 ? formatPrice(0) : formatPrice(m.price)
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentStep("payment")} className="mt-6 w-full h-9 text-sm font-medium text-white bg-notion-black hover:bg-notion-black/85 rounded transition-colors">
                  Continue to Payment
                </button>
              </>
            )}

            {/* PAYMENT */}
            {currentStep === "payment" && (
              <>
                <h2 className="text-sm font-medium text-notion-black mb-5">Payment Method</h2>
                <div className="space-y-2 mb-6">
                  {paymentMethods.map((m) => (
                    <label key={m.id} className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                      selectedPayment === m.id ? "border-notion-black bg-selected" : "border-notion-border hover:border-notion-gray"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPayment === m.id ? "border-notion-black" : "border-notion-border"
                        }`}>
                          {selectedPayment === m.id && <div className="w-2 h-2 rounded-full bg-notion-black" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-notion-black">{m.name}</div>
                          <div className="text-[12px] text-notion-gray">{m.desc}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-notion-black">
                        {!m.fee ? "Free" : m.fee >= 1 ? formatPrice(m.fee as number) : `${(m.fee * 100)}%`}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep("shipping")} className="h-9 px-5 text-sm font-medium text-notion-black border border-notion-border rounded hover:bg-hover transition-colors">
                    Back
                  </button>
                  <button onClick={() => setCurrentStep("confirm")} className="flex-1 h-9 text-sm font-medium text-white bg-notion-black hover:bg-notion-black/85 rounded transition-colors">
                    Review Order
                  </button>
                </div>
              </>
            )}

            {/* CONFIRM */}
            {currentStep === "confirm" && (
              <>
                <h2 className="text-sm font-medium text-notion-black mb-5">Review your order</h2>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="p-3 bg-surface rounded">
                    <h3 className="text-[13px] font-medium text-notion-black mb-1">Shipping To</h3>
                    <p className="text-[13px] text-notion-gray">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.postalCode}<br />
                      {formData.phone}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 p-3 bg-surface rounded">
                      <h3 className="text-[13px] font-medium text-notion-black mb-1">Payment</h3>
                      <p className="text-[13px] text-notion-gray">{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                    </div>
                    <div className="flex-1 p-3 bg-surface rounded">
                      <h3 className="text-[13px] font-medium text-notion-black mb-1">Shipping</h3>
                      <p className="text-[13px] text-notion-gray">{shippingMethods.find(m => m.id === selectedShipping)?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep("payment")} className="h-9 px-5 text-sm font-medium text-notion-black border border-notion-border rounded hover:bg-hover transition-colors">
                    Back
                  </button>
                  <button className="flex-1 h-9 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors">
                    Place Order — {formatPrice(grandTotal)}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-notion-border rounded p-5 sticky top-16">
            <h2 className="text-sm font-medium text-notion-black mb-4">Order Summary</h2>
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-surface rounded flex-shrink-0 flex items-center justify-center text-notion-gray/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium line-clamp-1">{item.name}</div>
                    <div className="text-[12px] text-notion-gray">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <hr className="border-notion-border mb-3" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-notion-gray">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-notion-gray">Shipping</span>
                <span>{isFreeShipping ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              {paymentFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-notion-gray">Payment fee</span>
                  <span>{formatPrice(paymentFee)}</span>
                </div>
              )}
            </div>
            <hr className="border-notion-border my-3" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
