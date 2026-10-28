import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Category Not Found | iSPACE BD" };
  }
  return {
    title: `${category.name} | iSPACE BD`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === slug);

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#e8eaed] transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">{category.name}</span>
        </div>

        {/* Hero Category Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#2a2e37] p-6 sm:p-10 mb-10 bg-[#14171c] shadow-xs">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] text-[11px] font-black uppercase tracking-wider">
              {categoryProducts.length} Items Available
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#e8eaed] tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#14171c] border border-[#2a2e37] shadow-xs">
            <p className="text-[#6b7280] text-sm">
              No products found in this category right now.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#c45c5c] text-white text-xs font-bold"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
