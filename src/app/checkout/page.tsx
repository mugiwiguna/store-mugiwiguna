"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Check, ChevronRight, CreditCard, Truck, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

type Step = "shipping" | "payment" | "confirm";

const steps: { id: Step; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Confirm" },
];

const paymentMethods = [
  { id: "bank", name: "Bank Transfer", desc: "BCA, Mandiri, BNI, BRI", price: 0 },
  { id: "ewallet", name: "E-Wallet", desc: "OVO, GoPay, Dana", price: 0 },
  { id: "card", name: "Credit Card", desc: "Visa, Mastercard", price: 2.5 },
  { id: "cod", name: "Cash on Delivery", desc: "Available for selected areas", price: 25000 },
];

const shippingMethods = [
  { id: "standard", name: "Standard Shipping", eta: "2-5 business days", price: 0, minOrder: 500000 },
  { id: "express", name: "Express Shipping", eta: "1-2 business days", price: 35000, minOrder: 0 },
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
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const totalPrice = getTotalPrice();
  const shippingCost = shippingMethods.find((s) => s.id === selectedShipping)?.price || 0;
  const paymentFee = selectedPayment === "card" ? Math.round(totalPrice * 0.025) : selectedPayment === "cod" ? 25000 : 0;
  const grandTotal = totalPrice + shippingCost + paymentFee;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  if (!isLoaded) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-[var(--text-placeholder)] mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-[var(--text-secondary)] mb-6">Add some items before checking out.</p>
        <Link href="/products" className="btn btn--primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* User Info */}
      {user && (
        <div className="bg-[var(--accent-subtle)] border border-[var(--accent-primary)]/20 rounded-lg px-4 py-3 mb-6 text-sm">
          Logged in as <span className="font-medium">{user.emailAddresses[0]?.emailAddress}</span>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isActive = step.id === currentStep;
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  isDone
                    ? "text-[var(--success)]"
                    : isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-placeholder)]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isDone
                      ? "bg-[var(--success)] text-white"
                      : isActive
                      ? "bg-[var(--accent-primary)] text-white"
                      : "border border-current"
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : index + 1}
                </div>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-[var(--text-placeholder)]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[var(--border-default)] rounded-xl p-6">
            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <>
                <h2 className="text-lg font-semibold mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                      placeholder="Jl. Sudirman No. 123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="Jakarta"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Postal Code</label>
                      <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  {/* Shipping Methods */}
                  <div className="pt-4 border-t border-[var(--border-default)]">
                    <h3 className="text-sm font-semibold mb-3">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedShipping === method.id
                              ? "border-[var(--accent-primary)] bg-[var(--accent-subtle)]"
                              : "border-[var(--border-default)] hover:border-[var(--border-hover)]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={() => setSelectedShipping(method.id)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedShipping === method.id
                              ? "border-[var(--accent-primary)]"
                              : "border-[var(--border-default)]"
                          }`}>
                            {selectedShipping === method.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{method.name}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{method.eta}</div>
                          </div>
                          <div className="text-sm font-semibold">
                            {method.price === 0 ? (
                              totalPrice >= 500000 ? (
                                <span className="text-[var(--success)]">Free</span>
                              ) : (
                                formatPrice(method.price)
                              )
                            ) : (
                              formatPrice(method.price)
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={nextStep} className="btn btn--primary btn--lg w-full mt-6">
                  Continue to Payment
                </button>
              </>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <>
                <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-[var(--accent-primary)] bg-[var(--accent-subtle)]"
                          : "border-[var(--border-default)] hover:border-[var(--border-hover)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "border-[var(--accent-primary)]"
                          : "border-[var(--border-default)]"
                      }`}>
                        {selectedPayment === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium flex items-center gap-2">
                          {method.id === "card" && <CreditCard className="w-4 h-4" />}
                          {method.id === "bank" && <Truck className="w-4 h-4" />}
                          {method.name}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">{method.desc}</div>
                      </div>
                      <div className="text-sm font-semibold">
                        {method.price === 0 ? "Free" : method.price === 2.5 ? "2.5%" : formatPrice(method.price)}
                      </div>
                    </label>
                  ))}
                </div>

                {selectedPayment === "card" && (
                  <div className="space-y-4 p-4 bg-[var(--bg-surface)] rounded-lg mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiry</label>
                        <input
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <input
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={prevStep} className="btn btn--secondary btn--lg">
                    Back
                  </button>
                  <button onClick={nextStep} className="btn btn--primary btn--lg flex-1">
                    Review Order
                  </button>
                </div>
              </>
            )}

            {/* Confirm Step */}
            {currentStep === "confirm" && (
              <>
                <h2 className="text-lg font-semibold mb-6">Review Your Order</h2>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-[var(--bg-surface)] rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Shipping To</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.postalCode}<br />
                      {formData.phone}
                    </p>
                  </div>

                  <div className="p-4 bg-[var(--bg-surface)] rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Payment Method</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                    </p>
                  </div>

                  <div className="p-4 bg-[var(--bg-surface)] rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Shipping Method</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {shippingMethods.find((s) => s.id === selectedShipping)?.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={prevStep} className="btn btn--secondary btn--lg">
                    Back
                  </button>
                  <button className="btn btn--primary btn--lg flex-1">
                    Place Order — {formatPrice(grandTotal)}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-[var(--border-default)] rounded-xl p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-[var(--bg-surface)] rounded-md flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-[var(--border-default)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Shipping</span>
                <span>{shippingCost === 0 && totalPrice >= 500000 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              {paymentFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Payment Fee</span>
                  <span>{formatPrice(paymentFee)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[var(--border-default)] font-semibold">
                <span>Total</span>
                <span className="text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
