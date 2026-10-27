import React from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export const metadata = {
  title: "Order Confirmed | iSPACE BD",
  description: "Thank you for your order at iSPACE BD. We are preparing your tech gadget delivery.",
};

export default async function OrderSuccessPage({ params }) {
  const { id } = await params;
  return <OrderSuccessClient orderId={id} />;
}
