import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import {
  getCategoriesFromServer,
  getCategoryWiseProducts,
  getProductsBySubcategory
} from "@/lib/api";
import { mapProductList } from "@/lib/productMapping";
import { slugifyProductName } from "@/lib/productSlug";

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoriesRes = await getCategoriesFromServer().catch(() => ({ success: false }));
  const apiCats = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const foundApi = apiCats.find(
    (c) => slugifyProductName(c.name) === slug || String(c.category_id) === slug
  );

  if (foundApi) {
    return {
      title: `${foundApi.name} | iSPACE BD`,
      description: `Shop authentic ${foundApi.name} with official warranty and 0% EMI at iSPACE BD.`,
    };
  }

  return { title: "Category Not Found | iSPACE BD" };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const selectedSubId = sParams?.sub ? Number(sParams.sub) : null;

  const categoriesRes = await getCategoriesFromServer().catch(() => ({ success: false }));
  const apiCats = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const foundApi = apiCats.find(
    (c) => slugifyProductName(c.name) === slug || String(c.category_id) === slug
  );

  if (!foundApi) {
    notFound();
  }

  const activeSub = Array.isArray(foundApi.sub_category)
    ? foundApi.sub_category.find((s) => s.id === selectedSubId)
    : null;

  const categoryName = activeSub ? `${activeSub.name} - ${foundApi.name}` : foundApi.name;
  const categoryDesc = activeSub
    ? `Explore genuine ${activeSub.name} models under ${foundApi.name} with official warranty and 0% EMI at iSPACE BD.`
    : `Official ${foundApi.name} flagships, international editions, and verified authentic gadgets at iSPACE BD.`;

  let rawList = [];
  if (selectedSubId) {
    const subRes = await getProductsBySubcategory(selectedSubId, 1).catch(() => null);
    rawList = subRes?.data?.data || subRes?.data || [];
  }
  
  // If no subcategory or subcategory returned empty, load category products
  if (rawList.length === 0 && !selectedSubId) {
    const prodRes = await getCategoryWiseProducts(foundApi.category_id, 1).catch(() => null);
    rawList = prodRes?.data?.data || prodRes?.data || [];
  }

  const categoryProducts = mapProductList(rawList);

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
          <span className="text-[#e8eaed] font-bold">{categoryName}</span>
        </div>

        {/* Hero Category Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#2a2e37] p-6 sm:p-10 mb-6 bg-[#14171c] shadow-xs">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] text-[11px] font-black uppercase tracking-wider">
              {categoryProducts.length} Items Available
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#e8eaed] tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
              {categoryDesc}
            </p>
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        {foundApi && Array.isArray(foundApi.sub_category) && foundApi.sub_category.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
            <Link
              href={`/category/${slug}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                !selectedSubId
                  ? "bg-[#c45c5c] text-white shadow-md shadow-[#c45c5c]/30"
                  : "bg-[#14171c] border border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:border-[#3d4450]"
              }`}
            >
              All {foundApi.name}
            </Link>
            {foundApi.sub_category.map((sub) => {
              const isSelected = selectedSubId === sub.id;
              return (
                <Link
                  key={sub.id}
                  href={`/category/${slug}?sub=${sub.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#c45c5c] text-white shadow-md shadow-[#c45c5c]/30"
                      : "bg-[#14171c] border border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:border-[#3d4450]"
                  }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        )}

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
