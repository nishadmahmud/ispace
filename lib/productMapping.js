import { slugifyProductName } from "./productSlug.js";
import { isUpcomingFlag } from "./productFlags.js";

/**
 * Standard color hex map for known devices
 */
const COLOR_HEX_MAP = {
  black: "#1c1c1e",
  spaceblack: "#1c1c1e",
  "space black": "#1c1c1e",
  white: "#f5f5f7",
  silver: "#e5e5ea",
  gold: "#fae7cf",
  desert: "#c7b299",
  "desert titanium": "#c7b299",
  natural: "#9a978f",
  "natural titanium": "#9a978f",
  blue: "#2c3e50",
  titanium: "#8e8e93",
  midnight: "#191f28",
  starlight: "#faf7f2",
  green: "#2e5c3e",
  pink: "#f8d2d6",
  yellow: "#fbe88b",
  purple: "#d1c4e9",
  grey: "#8e8e93",
  gray: "#8e8e93",
  graphite: "#38373b",
  sierra: "#9bb5ce",
  alpine: "#506456",
  red: "#d32f2f"
};

function getColorHex(colorName) {
  if (!colorName) return "#8e8e93";
  const normalized = String(colorName).trim().toLowerCase();
  for (const [key, hex] of Object.entries(COLOR_HEX_MAP)) {
    if (normalized.includes(key)) return hex;
  }
  return "#4a5568";
}

/**
 * Map a raw API product object into iSPACE's UI model
 */
export function mapApiProductToViewModel(p) {
  if (!p) return null;

  const originalPrice = Number(p.retails_price || 0);
  const discountValue = Number(p.discount || 0);
  const discountType = String(p.discount_type || "").toLowerCase();
  const hasDiscount = discountValue > 0 && discountType !== "0";

  const price = hasDiscount
    ? discountType === "percentage"
      ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
      : Math.max(0, originalPrice - discountValue)
    : originalPrice;

  // Images resolution
  const imeiImages = Array.isArray(p.imei_image) ? p.imei_image.filter(Boolean) : [];
  const imageList = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
  const imagePaths = Array.isArray(p.image_paths) ? p.image_paths.filter(Boolean) : [];
  
  let images = [];
  if (imageList.length > 0) images = imageList;
  else if (imagePaths.length > 0) images = imagePaths;
  else if (imeiImages.length > 0) images = imeiImages;
  else if (p.image_path) images = [p.image_path];
  else if (p.image_path1) images = [p.image_path1];
  else images = ["/icon.png"];

  // Ensure absolute or safe URLs
  images = images.map((img) => {
    if (!img) return "/icon.png";
    if (typeof img === "object" && img.image_path) return img.image_path;
    return String(img);
  });

  // Stock status
  const imeiList = Array.isArray(p.imeis) ? p.imeis : [];
  const validImeis = imeiList.filter((i) => i?.ecommerce_stock !== 0 && i?.ecommerce_stock !== "0");
  const rawImeis = validImeis.filter((i) => Number(i?.in_stock) === 1);
  const statusText = String(p.status || "").toLowerCase();
  const parsedStock = Number(p.current_stock ?? p.in_stock ?? 0);
  const inStock = imeiList.length > 0
    ? rawImeis.length > 0
    : typeof p.in_stock === "number"
    ? p.in_stock !== 0
    : Number.isFinite(parsedStock)
    ? parsedStock > 0
    : !statusText.includes("out");

  const upcoming = isUpcomingFlag(p.upcoming);

  // Colors
  const rawColors = Array.isArray(p.color)
    ? p.color.filter(Boolean)
    : p.colors && Array.isArray(p.colors)
    ? p.colors
    : [];
  
  const colors = rawColors.length > 0
    ? rawColors.map((c) => {
        const name = typeof c === "string" ? c : c?.name || "Standard";
        const hex = getColorHex(name);
        return { name, hex, bg: hex };
      })
    : [{ name: "Standard", hex: "#1c1c1e", bg: "#1c1c1e" }];

  // Storage / Variants
  let storage = [{ size: "Standard", priceOffset: 0 }];
  if (Array.isArray(p.items_values) && p.items_values.length > 0) {
    storage = p.items_values.map((v) => ({
      size: v.name || v.value || "Standard",
      priceOffset: Number(v.price || 0)
    }));
  }

  // Specifications key-value mapping
  const specs = {};
  if (Array.isArray(p.specifications)) {
    p.specifications.forEach((s) => {
      const key = s.key || s.name || s.title || s.spec_name;
      const val = s.value || s.val || s.description || s.spec_value;
      if (key && val) specs[key] = String(val);
    });
  } else if (p.specifications && typeof p.specifications === "object") {
    Object.assign(specs, p.specifications);
  }

  if (p.brand_name || p.brands?.name) specs["Brand"] = p.brand_name || p.brands?.name;
  if (p.country) specs["Country / Region"] = p.country;
  if (p.product_weight) specs["Weight"] = `${p.product_weight}g`;

  const name = p.name || "Electronic Product";
  const slug = slugifyProductName(name);

  return {
    id: p.id,
    name,
    slug,
    brand: p.brand_name || p.brands?.name || p.brand?.name || "Apple / Flagship",
    category: p.category_name || p.category?.name || "Gadget",
    categoryId: p.category_id || p.category?.id || null,
    categorySlug: p.category_slug || p.category?.slug || "all",
    price,
    regularPrice: originalPrice > price ? originalPrice : price,
    discount: hasDiscount
      ? discountType === "percentage"
        ? `${discountValue}% OFF`
        : `Save ৳${discountValue.toLocaleString("en-IN")}`
      : null,
    badge: upcoming ? "Pre-Order" : hasDiscount ? "Deal" : null,
    isNew: Boolean(p.is_new || upcoming),
    inStock,
    stock: parsedStock || 10,
    rating: p.rating ? Number(p.rating) : null,
    reviewCount: p.review_count || p.reviews_count ? Number(p.review_count || p.reviews_count) : 0,
    images,
    colors,
    storage,
    simOptions: Array.isArray(p.sim_options) ? p.sim_options : [],
    specs: Object.keys(specs).length > 0 ? specs : {
      "Authenticity": "100% Genuine with Warranty",
      "Condition": "Brand New Factory Sealed",
      "Support": "Dedicated iSPACE BD Lab Support"
    },
    keyFeatures: [
      "Official warranty & 7 days replacement guarantee",
      "Free inside-Dhaka delivery & express parcel options",
      "0% EMI facility available across 28+ leading banks"
    ],
    description: p.description || p.short_description || ""
  };
}

/**
 * Map an array of products safely
 */
export function mapProductList(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapApiProductToViewModel).filter(Boolean);
}
