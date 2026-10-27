import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product Not Found | iSPACE BD" };
  }
  return {
    title: `${product.name} Price in Bangladesh | iSPACE BD`,
    description: `Buy ${product.name} at the best price in Bangladesh with official warranty, 0% EMI up to 36 months, and fast nationwide delivery from iSPACE BD.`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-8">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
