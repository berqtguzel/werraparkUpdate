/**
 * Yasal / footer-only sayfa slug'ları.
 * Bu linkler sadece footer bottom'da gösterilir; header ve footer nav'dan çıkarılır.
 */
const LEGAL_SLUGS = [
    "impressum",
    "imprint",
    "privacy",
    "datenschutz",
    "agb",
    "terms",
    "terms-and-conditions",
    "kontakt",
    "contact",
];

/**
 * Slug veya URL'nin yasal sayfa olup olmadığını kontrol eder.
 */
export function isLegalSlug(slugOrUrl) {
    if (!slugOrUrl || typeof slugOrUrl !== "string") return false;
    const s = slugOrUrl.toLowerCase().replace(/^\//, "").split("/").pop();
    return LEGAL_SLUGS.some((legal) => s === legal || s.includes(legal));
}

/**
 * Menü öğelerinden yasal linkleri filtreler.
 * @param {Array} items - { name, url, key, children? }[]
 */
export function filterLegalItems(items) {
    if (!Array.isArray(items)) return [];
    return items
        .filter((item) => !isLegalSlug(item.key ?? item.url ?? item.slug ?? ""))
        .map((item) => {
            if (item.children?.length) {
                return {
                    ...item,
                    children: filterLegalItems(item.children),
                };
            }
            return item;
        })
        .filter((item) => {
            if (item.children?.length) return true;
            return item.name || item.url;
        });
}

/**
 * parent_id ile düz liste verildiğinde ağaç yapısı oluşturur.
 * Aynı parent_id'ye sahip öğeler sadece parent'ın children'ında görünür, üst seviyede tekrarlanmaz.
 * @param {Array} flatItems - { id, parent_id?, parent?, menu_item_parent?, ... }[]
 */
export function buildTreeFromParentId(flatItems) {
    if (!Array.isArray(flatItems) || !flatItems.length) return [];

    const getParentId = (item) => {
        const p =
            item.parent_id ?? item.parent ?? item.menu_item_parent ?? null;
        return p === 0 || p === "0" ? null : p;
    };

    const byId = new Map();
    flatItems.forEach((item) => {
        byId.set(item.id, { ...item });
    });

    const roots = [];
    const childIds = new Set();

    flatItems.forEach((item) => {
        const pid = getParentId(item);
        if (pid != null && pid !== "") {
            childIds.add(item.id);
        }
    });

    flatItems.forEach((item) => {
        const pid = getParentId(item);
        const isRoot = pid == null || pid === "" || !byId.has(pid);
        if (!isRoot) return;

        const node = byId.get(item.id);
        if (!node) return;

        const children = flatItems
            .filter((i) => {
                const p = getParentId(i);
                return p != null && String(p) === String(item.id);
            })
            .map((child) => buildNodeWithChildren(child, flatItems, getParentId, byId));

        if (children.length) node.children = children;
        roots.push(node);
    });

    return roots;
}

function buildNodeWithChildren(item, flatItems, getParentId, byId) {
    const base = byId.get(item.id);
    const node = base ? { ...base, ...item } : { ...item };
    const children = flatItems
        .filter(
            (i) =>
                getParentId(i) != null &&
                String(getParentId(i)) === String(item.id),
        )
        .map((c) => buildNodeWithChildren(c, flatItems, getParentId, byId));
    if (children.length) node.children = children;
    return node;
}

/**
 * Items zaten nested (children var) ama aynı öğe hem üst hem child olarak gelebilir.
 * parent_id varsa tree'ye çevir; yoksa child olarak geçenleri üst seviyeden kaldır.
 */
export function ensureTreeNoDuplicates(items) {
    if (!Array.isArray(items) || !items.length) return items;

    const hasParentId = items.some(
        (i) =>
            i.parent_id != null ||
            i.parent != null ||
            i.menu_item_parent != null,
    );
    if (hasParentId) {
        return buildTreeFromParentId(items);
    }

    const childIds = new Set();
    function collectChildIds(arr) {
        (arr || []).forEach((item) => {
            (item.children ?? item.items ?? []).forEach((c) => {
                childIds.add(c.id ?? c.slug ?? c.url);
                collectChildIds(c.children ?? c.items);
            });
        });
    }
    collectChildIds(items);

    return items.filter(
        (item) => !childIds.has(item.id ?? item.slug ?? item.url),
    );
}

/**
 * Ağaç yapısını footer gibi düz liste için tek seviyeye indirir.
 * Her öğe bir kez görünür (parent'ın child'ı olanlar üstte tekrar etmez).
 */
export function flattenTreeForNav(tree) {
    if (!Array.isArray(tree)) return [];
    const out = [];
    function walk(nodes) {
        (nodes || []).forEach((node) => {
            out.push(node);
            walk(node.children ?? node.items ?? []);
        });
    }
    walk(tree);
    return out;
}

/**
 * URL bazlı tekrarları kaldırır (ilk geçen korunur). İç içe children destekler.
 */
export function deduplicateByUrl(items) {
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    return items
        .filter((item) => {
            const url = (item.url ?? "").toLowerCase().replace(/\/$/, "");
            if (!url) return true;
            if (seen.has(url)) return false;
            seen.add(url);
            return true;
        })
        .map((item) => {
            if (item.children?.length) {
                return { ...item, children: deduplicateByUrl(item.children) };
            }
            return item;
        });
}
