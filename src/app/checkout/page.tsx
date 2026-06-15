"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, ShoppingBag, ArrowLeft, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

const steps = [
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
  { id: "standard", name: "Standard Shipping", eta: "2-5 business days", price: 0, minOrder: 500000 },
  { id: "express", name: "Express Shipping", eta: "1-2 business days", price: 35000, minOrder: 0 },
];

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const { items, getTotalPrice } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
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
  const paymentFee = typeof payment.fee === "number" && payment.fee >= 1 ? payment.fee : Math.round(totalPrice * (payment.fee as number));
  const grandTotal = totalPrice + shippingCost + paymentFee;
  const isFreeShipping = shipping.id === "standard" && totalPrice >= 500000;

  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some items before checking out.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User info bar */}
      {user && (
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 mb-6">
          <Check className="w-4 h-4" />
          Signed in as <span className="font-semibold">{user.emailAddresses[0]?.emailAddress}</span>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className={`flex items-center gap-2.5 ${i <= currentStep ? "text-blue-600" : "text-gray-300"}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                i < currentStep ? "bg-green-600 text-white" : i === currentStep ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-semibold hidden sm:inline ${i === currentStep ? "text-gray-900" : ""}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            {/* SHIPPING */}
            {currentStep === 0 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="+62 812 3456 7890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                    <input name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                      <input name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
                      <input name="postalCode" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100 my-8" />

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingMethods.map((m) => (
                      <label key={m.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedShipping === m.id ? "border-blue-600 bg-blue-50/50 shadow-sm" : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedShipping === m.id ? "border-blue-600" : "border-gray-300"
                        }`}>
                          {selectedShipping === m.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                          <div className="text-xs text-gray-500">{m.eta}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {isFreeShipping ? <span className="text-green-600">Free</span> : m.price === 0 ? formatPrice(0) : formatPrice(m.price)}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={() => setCurrentStep(1)} className="mt-8 w-full h-12 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                  Continue to Payment
                </button>
              </>
            )}

            {/* PAYMENT */}
            {currentStep === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-3 mb-8">
                  {paymentMethods.map((m) => (
                    <label key={m.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedPayment === m.id ? "border-blue-600 bg-blue-50/50 shadow-sm" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === m.id ? "border-blue-600" : "border-gray-300"
                      }`}>
                        {selectedPayment === m.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.desc}</div>
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {!m.fee ? "Free" : typeof m.fee === "number" && m.fee >= 1 ? formatPrice(m.fee) : `${(m.fee as number) * 100}%`}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep(0)} className="h-12 px-8 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Back</button>
                  <button onClick={() => setCurrentStep(2)} className="flex-1 h-12 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm">Review Order</button>
                </div>
              </>
            )}

            {/* CONFIRM */}
            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-8">
                  <div className="p-5 bg-gray-50 rounded-xl">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Shipping To</h3>
                    <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}<br />{formData.address}<br />{formData.city}, {formData.postalCode}<br />{formData.phone}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Payment</h3>
                      <p className="text-sm text-gray-600">{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Shipping</h3>
                      <p className="text-sm text-gray-600">{shippingMethods.find(m => m.id === selectedShipping)?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCurrentStep(1)} className="h-12 px-8 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Back</button>
                  <button className="flex-1 h-12 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm">Place Order — {formatPrice(grandTotal)}</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold line-clamp-1">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    <div className="text-sm font-bold mt-0.5">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-gray-100 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold">{isFreeShipping ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}</span></div>
              {paymentFee > 0 && <div className="flex justify-between"><span className="text-gray-500">Payment Fee</span><span className="font-semibold">{formatPrice(paymentFee)}</span></div>}
            </div>
            <hr className="border-gray-100 my-4" />
            <div className="flex justify-between text-base"><span className="font-bold">Total</span><span className="font-bold text-lg">{formatPrice(grandTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
