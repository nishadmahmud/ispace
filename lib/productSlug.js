export function slugifyProductName(name) {
  return String(name || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'product';
}

/** 
 * Strip trailing `-12345` (5+ digit legacy product ids) so old URLs still resolve.
 * Short trailing numbers (e.g. iphone-13, pixel-8) are kept as part of the name slug.
 */
export function productNameFromRouteSlug(routeSlug) {
  const decoded = decodeURIComponent(String(routeSlug || '').trim());
  if (!decoded) return '';
  if (/^\d+$/.test(decoded)) return decoded;
  return decoded.replace(/-\d{5,}$/, '');
}
