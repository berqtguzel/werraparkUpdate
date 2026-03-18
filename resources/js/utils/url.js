const LOCALES = ["de", "en", "tr"];

/**
 * URL'de locale yoksa ekler. /about -> /de/about, /de/about -> /de/about
 */
export function ensureLocaleInUrl(url, locale) {
    if (!url || typeof url !== "string" || url.startsWith("http")) return url;
    const path = url.startsWith("/") ? url : `/${url}`;
    const parts = path.split("/").filter(Boolean);
    const first = parts[0]?.toLowerCase();
    if (LOCALES.includes(first)) return path;
    return `/${locale}${path}`;
}
