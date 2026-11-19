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
  red: "#d32f2f",
  burgundy: "#9b0303",
  glacier: "#4bb8fb"
};

function getColorHex(colorName, explicitHex) {
  if (explicitHex && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(explicitHex).trim())) {
    return String(explicitHex).trim();
  }
  if (!colorName) return "#8e8e93";
  const normalized = String(colorName).trim().toLowerCase();
  for (const [key, hex] of Object.entries(COLOR_HEX_MAP)) {
    if (normalized.includes(key)) return hex;
  }
  return "#4a5568";
}

function formatStorageLabel(raw) {
  if (raw == null || raw === "") return null;
  const value = String(raw).trim();
  if (!value) return null;
  if (/[/]/.test(value)) return value; // e.g. 12/256 RAM/storage combo
  if (/^\d+$/.test(value)) return `${value}GB`;
  if (/^\d+\s*gb$/i.test(value)) return value.replace(/\s+/g, "").toUpperCase().replace("GB", "GB");
  return value;
}

function isUsableSalePrice(price) {
  const n = Number(price);
  return Number.isFinite(n) && n >= 1000;
}

function uniqueNonEmpty(values) {
  const seen = new Set();
  const out = [];
  for (const raw of values) {
    if (raw == null) continue;
    const value = String(raw).trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function decodeHtmlEntities(text) {
  return String(text || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSpecsFromHtml(html) {
  if (!html || typeof html !== "string") return {};
  const specs = {};
  const re = /<strong>\s*([^<:]+?)\s*:?\s*<\/strong>\s*([^<]+)/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const key = decodeHtmlEntities(match[1]);
    const val = decodeHtmlEntities(match[2]);
    if (key && val) specs[key] = val;
  }
  return specs;
}

function buildColorsFromProduct(p, imeiList) {
  const hexByName = new Map();

  for (const imei of imeiList) {
    const name = imei?.color;
    if (!name) continue;
    const key = String(name).trim();
    if (!key) continue;
    if (!hexByName.has(key)) {
      hexByName.set(key, getColorHex(key, imei.color_code));
    }
  }

  const rawColors = Array.isArray(p.color)
    ? p.color.filter(Boolean)
    : Array.isArray(p.colors)
    ? p.colors
    : [];

  for (const c of rawColors) {
    const name = typeof c === "string" ? c : c?.name;
    if (!name) continue;
    const key = String(name).trim();
    if (!key || hexByName.has(key)) continue;
    const explicit =
      (typeof c === "object" && (c.hex || c.color_code || c.code)) ||
      p.color_code ||
      null;
    hexByName.set(key, getColorHex(key, explicit));
  }

  if (hexByName.size === 0) {
    return [{ name: "Standard", hex: "#1c1c1e", bg: "#1c1c1e" }];
  }

  return Array.from(hexByName.entries()).map(([name, hex]) => ({
    name,
    hex,
    bg: hex
  }));
}

function buildStorageFromProduct(p, imeiList, basePrice) {
  if (Array.isArray(p.items_values) && p.items_values.length > 0) {
    return p.items_values.map((v) => ({
      size: formatStorageLabel(v.name || v.value) || "Standard",
      priceOffset: Number(v.price || 0)
    }));
  }

  const topLevel = formatStorageLabel(p.storage);
  const pricesBySize = new Map();

  for (const imei of imeiList) {
    const size = formatStorageLabel(imei?.storage);
    if (!size) continue;
    if (!pricesBySize.has(size)) pricesBySize.set(size, []);
    if (isUsableSalePrice(imei.sale_price)) {
      pricesBySize.get(size).push(Number(imei.sale_price));
    }
  }

  if (pricesBySize.size === 0) {
    if (topLevel) return [{ size: topLevel, priceOffset: 0 }];
    return [{ size: "Standard", priceOffset: 0 }];
  }

  let entries = Array.from(pricesBySize.entries()).map(([size, prices]) => {
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    return { size, minPrice };
  });

  // Drop capacity options that only have junk API prices (0/1) when real prices exist
  const priced = entries.filter((e) => e.minPrice != null);
  if (priced.length > 0) entries = priced;

  // Prefer numeric capacity order: 256GB, 512GB, 1TB, 2TB
  const rank = (size) => {
    const m = String(size).match(/(\d+(?:\.\d+)?)\s*(tb|gb)?/i);
    if (!m) return Number.MAX_SAFE_INTEGER;
    const n = Number(m[1]);
    const unit = (m[2] || "gb").toLowerCase();
    return unit === "tb" ? n * 1024 : n;
  };
  entries.sort((a, b) => rank(a.size) - rank(b.size));

  const baseline =
    priced.length > 0 ? Math.min(...priced.map((e) => e.minPrice)) : basePrice;

  return entries.map((e) => ({
    size: e.size,
    priceOffset:
      e.minPrice != null ? Math.max(0, Math.round(e.minPrice - baseline)) : 0
  }));
}

function buildSimOptions(p, imeiList) {
  if (Array.isArray(p.sim_options) && p.sim_options.length > 0) {
    return uniqueNonEmpty(p.sim_options);
  }
  const fromImeis = uniqueNonEmpty(imeiList.map((i) => i?.region));
  if (fromImeis.length > 0) return fromImeis;
  if (p.region) return [String(p.region).trim()];
  if (p.country) return [String(p.country).trim()];
  return [];
}

function buildBatteryHealth(p, imeiList) {
  const fromImeis = uniqueNonEmpty(
    imeiList.map((i) => i?.battery_life ?? i?.battery_health ?? i?.battery)
  );
  if (fromImeis.length > 0) {
    return fromImeis.length === 1 ? fromImeis[0] : fromImeis.join(", ");
  }
  const top = p.battery_life || p.battery_health || p.battery;
  return top ? String(top).trim() : null;
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
    ? rawImeis.length > 0 || imeiList.some((i) => Number(i?.in_stock) === 1)
    : typeof p.in_stock === "number"
    ? p.in_stock !== 0
    : Number.isFinite(parsedStock)
    ? parsedStock > 0
    : !statusText.includes("out");

  const upcoming = isUpcomingFlag(p.upcoming);

  const colors = buildColorsFromProduct(p, imeiList);
  const storage = buildStorageFromProduct(p, imeiList, price);
  const simOptions = buildSimOptions(p, imeiList);
  const batteryHealth = buildBatteryHealth(p, imeiList);

  // Specifications key-value mapping
  const specs = {};
  if (Array.isArray(p.specifications) && p.specifications.length > 0) {
    p.specifications.forEach((s) => {
      const key = s.key || s.name || s.title || s.spec_name;
      const val = s.value || s.val || s.description || s.spec_value;
      if (key && val) specs[key] = String(val);
    });
  } else if (p.specifications && typeof p.specifications === "object" && !Array.isArray(p.specifications)) {
    Object.assign(specs, p.specifications);
  }

  Object.assign(specs, parseSpecsFromHtml(p.short_description));

  if (p.brand_name || p.brands?.name) specs["Brand"] = p.brand_name || p.brands?.name;
  if (p.ram) specs["RAM"] = String(p.ram);
  else {
    const ramVals = uniqueNonEmpty(imeiList.map((i) => i?.ram));
    if (ramVals.length === 1) specs["RAM"] = ramVals[0];
  }
  if (storage.length > 0 && storage[0].size !== "Standard") {
    specs["Storage"] =
      storage.length === 1
        ? storage[0].size
        : storage.map((s) => s.size).join(" / ");
  }
  const regionLabel =
    simOptions.length > 0
      ? simOptions.length === 1
        ? simOptions[0]
        : simOptions.join(" / ")
      : p.country || p.region || null;
  if (regionLabel) specs["Country / Region"] = regionLabel;
  if (batteryHealth) specs["Battery Health"] = batteryHealth;
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
    simOptions,
    batteryHealth,
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
