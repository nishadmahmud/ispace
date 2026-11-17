/**
 * API Library for iSPACE BD
 * Connects to outletexpense.xyz API with merchant NEXT_PUBLIC_USER_ID
 */

const API_BASE = process.env.NEXT_PUBLIC_API || "https://www.outletexpense.xyz/api";
const USER_ID = process.env.NEXT_PUBLIC_USER_ID || "365";

// In-memory cache for API responses
const apiCache = new Map();

async function getCachedOrFetch(cacheKey, fetchFn) {
  return fetchFn();
}

export function clearApiCache() {
  apiCache.clear();
}

/**
 * Fetch categories from server
 */
export async function getCategoriesFromServer() {
  return getCachedOrFetch("categories", async () => {
    try {
      const res = await fetch(`${API_BASE}/public/categories/${USER_ID}`, {
        next: { revalidate: 300 }
      });
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("getCategoriesFromServer error:", err);
      return { success: false, data: [] };
    }
  });
}

/**
 * Fetch sliders from server
 */
export async function getSlidersFromServer() {
  return getCachedOrFetch("sliders", async () => {
    try {
      const res = await fetch(`${API_BASE}/public/sliders/${USER_ID}`, {
        next: { revalidate: 300 }
      });
      if (!res.ok) throw new Error(`Failed to fetch sliders: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("getSlidersFromServer error:", err);
      return { success: false, sliders: [] };
    }
  });
}

/**
 * Fetch new arrivals from server
 */
export async function getNewArrivalsFromServer() {
  return getCachedOrFetch("new_arrivals", async () => {
    try {
      const res = await fetch(`${API_BASE}/public/new-arrivals/${USER_ID}`, {
        next: { revalidate: 120 }
      });
      if (!res.ok) throw new Error(`Failed to fetch new arrivals: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("getNewArrivalsFromServer error:", err);
      return { success: false, data: { data: [] } };
    }
  });
}

/**
 * Fetch best deals from server
 */
export async function getBestDealsFromServer() {
  return getCachedOrFetch("best-deals", async () => {
    try {
      const res = await fetch(`${API_BASE}/public/best-deals/${USER_ID}`, {
        next: { revalidate: 120 }
      });
      if (!res.ok) throw new Error(`Failed to fetch best deals: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("getBestDealsFromServer error:", err);
      return { success: false, data: [] };
    }
  });
}

/**
 * Fetch best selling products from server
 */
export async function getBestSellersFromServer() {
  return getCachedOrFetch("best-sellers", async () => {
    try {
      const res = await fetch(`${API_BASE}/public/best-sellers/${USER_ID}`, {
        next: { revalidate: 120 }
      });
      if (!res.ok) throw new Error(`Failed to fetch best sellers: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("getBestSellersFromServer error:", err);
      return { success: false, data: [] };
    }
  });
}

/**
 * Fetch single product details by ID
 */
export async function getProductById(productId) {
  try {
    const res = await fetch(`${API_BASE}/public/products-detail/${productId}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
}

/**
 * Fetch product details by slug
 */
export async function getProductBySlug(productName) {
  try {
    const res = await fetch(`${API_BASE}/public/products-detail-slug`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: USER_ID,
        product_name: productName
      }),
      next: { revalidate: 60 }
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
}

/**
 * Fetch related products for a product
 */
export async function getRelatedProduct(productId) {
  try {
    const res = await fetch(`${API_BASE}/public/get-related-products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        user_id: USER_ID
      })
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch (err) {
    console.error(`getRelatedProduct error (${productId}):`, err);
    return { success: false, data: [] };
  }
}

/**
 * Fetch products by category
 */
export async function getCategoryWiseProducts(categoryId, page = 1) {
  try {
    const res = await fetch(
      `${API_BASE}/public/categorywise-products/${categoryId}?page=${page}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`Category products error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`getCategoryWiseProducts error (${categoryId}):`, err);
    return { success: false, data: { data: [] } };
  }
}

/**
 * Fetch products by subcategory
 */
export async function getProductsBySubcategory(subcategoryId, page = 1) {
  try {
    const res = await fetch(
      `${API_BASE}/public/subcategorywise-products/${subcategoryId}?page=${page}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`Subcategory products error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`getProductsBySubcategory error (${subcategoryId}):`, err);
    return { success: false, data: { data: [] } };
  }
}

/**
 * Fetch products with pagination & category filter
 */
export async function getProducts(page = 1, categoryId = 0, subcategoryId = 0) {
  try {
    let url = `${API_BASE}/public/products/userwise?user_id=${USER_ID}&page=${page}&per_page=24`;
    if (categoryId && categoryId !== 0) {
      url += `&category_id=${categoryId}`;
    }
    if (subcategoryId && subcategoryId !== 0) {
      url += `&subcategory_id=${subcategoryId}`;
    }
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) throw new Error(`getProducts error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("getProducts error:", err);
    return { success: false, data: { data: [] } };
  }
}

/**
 * Search products
 */
export async function searchProducts(keyword) {
  if (!keyword || !keyword.trim()) return { success: true, data: [] };
  try {
    const res = await fetch(`${API_BASE}/public/search-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: keyword.trim(),
        user_id: USER_ID,
        limit: 50
      })
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch (err) {
    console.error("searchProducts error:", err);
    return { success: false, data: [] };
  }
}

/**
 * Save sales order (Checkout)
 */
export async function saveSalesOrder(orderData) {
  const payload = {
    ...orderData,
    user_id: orderData.user_id || USER_ID,
    sales_id: orderData.sales_id || USER_ID
  };
  try {
    const res = await fetch(`${API_BASE}/public/ecommerce-save-sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("saveSalesOrder error:", err);
    return { success: false, message: "Network error occurred while placing order." };
  }
}

/**
 * Track Order
 */
export async function trackOrder(trackData) {
  const payload = {
    invoice_id: trackData.invoice_id,
    user_id: USER_ID
  };
  try {
    const res = await fetch(`${API_BASE}/search-web-invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("trackOrder error:", err);
    return { success: false, message: "Failed to connect to tracking server." };
  }
}

/**
 * Fetch banners from server
 */
export async function getBannerFromServer() {
  try {
    const res = await fetch(`${API_BASE}/public/banners/${USER_ID}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error("Failed to fetch banners");
    return await res.json();
  } catch (err) {
    console.error("getBannerFromServer error:", err);
    return { success: false, banners: [] };
  }
}
