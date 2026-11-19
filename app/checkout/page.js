"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatBDT, emiBanks } from "@/data/emi-banks";
import { saveSalesOrder } from "@/lib/api";
import {
  Truck,
  CreditCard,
  ShoppingBag,
  MapPin,
  Lock,
  Banknote
} from "lucide-react";

const bdDivisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, showToast } = useStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "Dhaka",
    district: "Dhaka City",
    address: "",
    orderNotes: ""
  });

  const [shippingMethod, setShippingMethod] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedEmiBank, setSelectedEmiBank] = useState(emiBanks[0].id);
  const [selectedEmiMonths, setSelectedEmiMonths] = useState(12);
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = shippingMethod === "inside" ? 60 : shippingMethod === "outside" ? 120 : 150;
  const finalTotal = cartTotal + (cart.length > 0 ? shippingCost : 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast("Please fill in your name, phone number, and address", "warning");
      return;
    }

    if (cart.length === 0) {
      showToast("Your cart is empty", "warning");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      pay_mode: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bkash" ? "bKash" : "EMI",
      paid_amount: 0,
      user_id: process.env.NEXT_PUBLIC_USER_ID || "432",
      sub_total: cartTotal,
      vat: 0,
      tax: 0,
      discount: 0,
      product: cart.map((item) => ({
        product_id: item.product?.id || item.id,
        qty: item.qty || 1,
        price: item.unitPrice || item.price,
        mode: 1,
        size: item.options?.storage || "Standard",
        sales_id: process.env.NEXT_PUBLIC_USER_ID || "432",
      })),
      delivery_method_id: 1,
      delivery_info_id: 1,
      delivery_customer_name: formData.fullName,
      delivery_customer_address: `${formData.address}, ${formData.district}, ${formData.division}`,
      delivery_customer_phone: formData.phone,
      delivery_fee: shippingCost,
      variants: [],
      created_at: new Date().toISOString(),
      customer_name: formData.fullName,
      customer_phone: formData.phone,
      sales_id: process.env.NEXT_PUBLIC_USER_ID || "432",
      wholeseller_id: 1,
      status: 1,
      delivery_city: formData.district,
      delivery_district: formData.division,
      detailed_address: formData.address,
    };

    let orderId = `ISP-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await saveSalesOrder(orderPayload);
      if (response && (response.success || response.invoice_id || response.data?.invoice_id)) {
        orderId = response.invoice_id || response.data?.invoice_id || orderId;
      }
    } catch (err) {
      console.warn("Failed to submit order to API, storing locally:", err);
    }

    const orderData = {
      orderId,
      customer: formData,
      items: cart,
      shippingMethod,
      shippingCost,
      subtotal: cartTotal,
      total: finalTotal,
      paymentMethod,
      emiDetails: paymentMethod === "emi" ? { bank: selectedEmiBank, months: selectedEmiMonths } : null,
      bkashTrxId: paymentMethod === "bkash" ? bkashTrxId : null,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(`ispace_order_${orderId}`, JSON.stringify(orderData));
      localStorage.setItem("ispace_last_order", orderId);
    } catch (err) {}

    clearCart();
    setIsSubmitting(false);
    showToast("Order placed successfully!", "success");
    router.push(`/order-success/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center p-6 text-[#e8eaed] text-center">
        <div className="max-w-md space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#c45c5c] mx-auto" />
          <h2 className="text-xl font-bold">Your Bag is Empty</h2>
          <p className="text-xs text-[#6b7280]">
            Add items to your bag before heading to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#c45c5c] text-white text-xs font-bold"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 font-medium">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#e8eaed] transition-colors">
            Bag
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">Checkout</span>
        </div>

        <h1 className="text-3xl font-black text-[#e8eaed] tracking-tight mb-8">
          Express Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Details & Payment (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Customer & Delivery Address */}
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-black text-[#e8eaed] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c45c5c]" /> 1. Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                    Phone Number (BD Mobile) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="017XXXXXXXX"
                    className="w-full h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tanvir@example.com"
                    className="w-full h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                    Division *
                  </label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c] font-medium"
                  >
                    {bdDivisions.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                  Full Street Address (House / Road / Flat / Landmark) *
                </label>
                <textarea
                  required
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. House 42, Road 11, Block D, Banani, Dhaka-1213"
                  className="w-full p-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Call before arriving, leave with security, etc."
                  className="w-full h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                />
              </div>
            </div>

            {/* 2. Delivery Speed */}
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-black text-[#e8eaed] uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#c45c5c]" /> 2. Delivery Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label
                  onClick={() => setShippingMethod("inside")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "inside"
                      ? "bg-[#c45c5c]/10 border-[#c45c5c] text-[#e8eaed]"
                      : "bg-[#1c1f26] border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "inside"}
                    onChange={() => setShippingMethod("inside")}
                    className="sr-only"
                  />
                  <div className="font-bold text-[#e8eaed] flex justify-between items-center">
                    <span>Inside Dhaka</span>
                    <span className="text-emerald-400">৳60</span>
                  </div>
                  <p className="text-[11px] text-[#6b7280] mt-1">Delivery in 24 Hours</p>
                </label>

                <label
                  onClick={() => setShippingMethod("outside")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "outside"
                      ? "bg-[#c45c5c]/10 border-[#c45c5c] text-[#e8eaed]"
                      : "bg-[#1c1f26] border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "outside"}
                    onChange={() => setShippingMethod("outside")}
                    className="sr-only"
                  />
                  <div className="font-bold text-[#e8eaed] flex justify-between items-center">
                    <span>Outside Dhaka</span>
                    <span className="text-emerald-400">৳120</span>
                  </div>
                  <p className="text-[11px] text-[#6b7280] mt-1">All BD in 48-72h</p>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "express"
                      ? "bg-[#c45c5c]/10 border-[#c45c5c] text-[#e8eaed]"
                      : "bg-[#1c1f26] border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="sr-only"
                  />
                  <div className="font-bold text-[#e8eaed] flex justify-between items-center">
                    <span>Express Same-Day</span>
                    <span className="text-emerald-400">৳150</span>
                  </div>
                  <p className="text-[11px] text-[#6b7280] mt-1">Within 6 Hours (Dhaka)</p>
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-black text-[#e8eaed] uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#c45c5c]" /> 3. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border text-center font-bold transition-all ${
                    paymentMethod === "cod"
                      ? "bg-[#c45c5c]/10 border-[#c45c5c] text-[#e8eaed] ring-1 ring-[#c45c5c]"
                      : "bg-[#1c1f26] border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto mb-1.5 text-emerald-400" />
                  <span className="block text-sm font-bold text-[#e8eaed]">Cash on Delivery</span>
                  <span className="block text-[11px] text-[#9aa3af] font-medium mt-0.5">Pay upon delivery</span>
                </button>

                {/* SSL / Online Payment - Grayed out & Coming Soon */}
                <div
                  className="p-4 rounded-2xl border border-[#2a2e37] bg-[#1c1f26]/40 text-center font-bold opacity-50 cursor-not-allowed select-none relative"
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-[#6b7280]" />
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-sm font-bold text-[#9aa3af]">SSLCommerz</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#2a2e37] text-[#9aa3af] uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <span className="block text-[11px] text-[#6b7280] font-medium mt-0.5">Card / Mobile Banking</span>
                </div>
              </div>

              {/* Conditional Payment UI */}
              {paymentMethod === "cod" && (
                <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#9aa3af] flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p>
                    Pay cash to the delivery courier after unboxing and verifying your product package.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-black text-[#e8eaed] flex items-center justify-between">
                <span>Items in Order ({cart.length})</span>
                <Link href="/cart" className="text-xs text-[#c45c5c] hover:underline font-bold">
                  Edit
                </Link>
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#2a2e37]">
                {cart.map((item) => (
                  <div key={item.cartKey} className="pt-2 flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 object-cover rounded-xl bg-[#1c1f26] border border-[#2a2e37] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#e8eaed] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-[#6b7280]">
                        Qty: {item.qty} • {item.options.storage}
                      </p>
                    </div>
                    <span className="font-black text-[#e8eaed]">
                      {formatBDT(item.unitPrice * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#2a2e37] space-y-2 text-xs">
                <div className="flex justify-between text-[#9aa3af]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#e8eaed]">{formatBDT(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#9aa3af]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#e8eaed]">{formatBDT(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#e8eaed] pt-2 border-t border-[#2a2e37]">
                  <span>Total Amount</span>
                  <span className="text-[#c45c5c]">{formatBDT(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order ({formatBDT(finalTotal)})
                  </>
                )}
              </button>

              <div className="text-[10px] text-[#6b7280] space-y-1 text-center pt-2 font-medium">
                <p className="flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#6b7280]" /> 256-bit Encrypted Checkout
                </p>
                <p>100% Genuine Guarantee & 7 Days Replacement Policy</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
