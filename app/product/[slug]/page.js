import React from "react";
import { notFound } from "next/navigation";
import { products as fallbackProducts } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import {
  getProductBySlug,
  getProductById,
  getRelatedProduct,
  getCategoryWiseProducts,
  getNewArrivalsFromServer
} from "@/lib/api";
import { mapApiProductToViewModel, mapProductList } from "@/lib/productMapping";
import { productNameFromRouteSlug } from "@/lib/productSlug";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = productNameFromRouteSlug(slug);

  let raw = null;
  if (/^\d+$/.test(cleanSlug)) {
    const res = await getProductById(cleanSlug).catch(() => null);
    raw = res?.data;
  }
  if (!raw) {
    const res = await getProductBySlug(cleanSlug).catch(() => null);
    raw = res?.data;
  }

  const product = raw
    ? mapApiProductToViewModel(raw)
    : fallbackProducts.find((p) => p.slug === slug || String(p.id) === slug);

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
  const cleanSlug = productNameFromRouteSlug(slug);

  let raw = null;
  if (/^\d+$/.test(cleanSlug)) {
    const res = await getProductById(cleanSlug).catch(() => null);
    raw = res?.data;
  }
  if (!raw) {
    const res = await getProductBySlug(cleanSlug).catch(() => null);
    raw = res?.data;
  }

  const product = raw
    ? mapApiProductToViewModel(raw)
    : fallbackProducts.find((p) => p.slug === slug || String(p.id) === slug);

  if (!product) {
    notFound();
  }

  // Find related products using live API
  let relatedProducts = [];
  if (product.id) {
    const relatedRes = await getRelatedProduct(product.id).catch(() => null);
    const relatedPayload = relatedRes?.data || relatedRes;
    const relatedItems = Array.isArray(relatedPayload?.data)
      ? relatedPayload.data
      : Array.isArray(relatedPayload)
      ? relatedPayload
      : [];
    if (relatedItems.length > 0) {
      relatedProducts = mapProductList(relatedItems)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    }
  }

  // If no explicit related items, fetch live products from the same category
  const categoryId = product.categoryId || raw?.category_id;
  if (relatedProducts.length === 0 && categoryId) {
    const catRes = await getCategoryWiseProducts(categoryId, 1).catch(() => null);
    const catItems = catRes?.data?.data || catRes?.data || [];
    if (Array.isArray(catItems) && catItems.length > 0) {
      relatedProducts = mapProductList(catItems)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    }
  }

  // If still empty, fetch live store new arrivals
  if (relatedProducts.length === 0) {
    const liveRes = await getNewArrivalsFromServer().catch(() => null);
    const liveItems = liveRes?.data?.data || liveRes?.data || [];
    if (Array.isArray(liveItems) && liveItems.length > 0) {
      relatedProducts = mapProductList(liveItems)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-8">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
