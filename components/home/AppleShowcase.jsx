import React from "react";
import { products } from "@/data/products";
import ProductRail from "@/components/home/ProductRail";

export default function AppleShowcase() {
  const appleProducts = products.filter((p) => p.brand === "Apple" && !p.isPreOwned);

  return (
    <ProductRail
      title="Apple Ecosystem"
      subtitle="Genuine Apple devices with official warranty"
      seeAllHref="/shop?brand=Apple"
      products={appleProducts}
      limit={5}
      lifted
    />
  );
}
