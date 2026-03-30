import React from "react";
import { Head, usePage } from "@inertiajs/react";

function pickFirst(...values) {
    for (const value of values) {
        if (value == null) continue;
        if (Array.isArray(value) && value.length === 0) continue;
        const text = typeof value === "string" ? value.trim() : value;
        if (text === "") continue;
        return value;
    }

    return null;
}

function toAbsoluteUrl(value, origin) {
    if (typeof value !== "string") return null;
    const text = value.trim();
    if (!text) return null;
    if (/^https?:\/\//i.test(text)) return text;
    if (!origin) return text;

    return `${origin.replace(/\/$/, "")}${text.startsWith("/") ? "" : "/"}${text}`;
}

function normalizeKeywords(value) {
    if (Array.isArray(value)) {
        return value.filter(Boolean).join(", ");
    }

    if (typeof value === "string") {
        const text = value.trim();
        return text || null;
    }

    return null;
}

export default function SeoHead({
    title = null,
    description = null,
    keywords = null,
    image = null,
    canonical = null,
    type = "website",
    meta = {},
    noIndex = false,
}) {
    const { props } = usePage();
    const settings = props?.global?.settings ?? {};
    const seo = settings?.seo ?? {};
    const branding = settings?.branding ?? {};
    const general = settings?.general ?? {};

    let origin = null;
    let currentUrl = null;
    try {
        currentUrl = props?.ziggy?.location ? String(props.ziggy.location) : null;
        origin = currentUrl ? new URL(currentUrl).origin : null;
    } catch {
        origin = null;
        currentUrl = null;
    }

    const siteName = pickFirst(
        general.site_name,
        general.siteName,
        branding.site_name,
        branding.siteName,
        "Werrapark",
    );

    const defaultTitle = pickFirst(seo.meta_title, seo.title, siteName, "Werrapark");
    const finalTitle = pickFirst(
        meta?.title,
        meta?.meta_title,
        meta?.metaTitle,
        title,
        defaultTitle,
    );
    const finalDescription = pickFirst(
        meta?.description,
        meta?.meta_description,
        meta?.metaDescription,
        description,
        seo.meta_description,
        seo.description,
    );
    const finalKeywords = normalizeKeywords(
        pickFirst(
            meta?.keywords,
            meta?.meta_keywords,
            meta?.metaKeywords,
            keywords,
            seo.meta_keywords,
            seo.keywords,
        ),
    );

    const resolvedCanonical = toAbsoluteUrl(
        pickFirst(
            meta?.canonical_url,
            meta?.canonicalUrl,
            canonical,
            currentUrl,
        ),
        origin,
    );

    const resolvedImage = toAbsoluteUrl(
        pickFirst(
            meta?.og_image,
            meta?.ogImage,
            meta?.twitter_image,
            meta?.twitterImage,
            image,
            seo.og_image,
            seo.ogImage,
            branding.logo_dark,
            branding.dark_logo,
            branding.logo,
            branding.logo_light,
            branding.light_logo,
            branding.favicon,
        ),
        origin,
    );

    const robots = noIndex
        ? "noindex,nofollow"
        : pickFirst(meta?.robots, meta?.robots_content, seo.robots, seo.robots_content);
    const ogTitle = pickFirst(meta?.og_title, meta?.ogTitle, finalTitle);
    const ogDescription = pickFirst(
        meta?.og_description,
        meta?.ogDescription,
        finalDescription,
    );
    const ogType = pickFirst(meta?.og_type, meta?.ogType, type, "website");
    const twitterCard = pickFirst(
        meta?.twitter_card,
        meta?.twitterCard,
        "summary_large_image",
    );
    const twitterTitle = pickFirst(
        meta?.twitter_title,
        meta?.twitterTitle,
        ogTitle,
    );
    const twitterDescription = pickFirst(
        meta?.twitter_description,
        meta?.twitterDescription,
        ogDescription,
    );
    const twitterImage = toAbsoluteUrl(
        pickFirst(meta?.twitter_image, meta?.twitterImage, resolvedImage),
        origin,
    );
    const favicon = toAbsoluteUrl(
        pickFirst(
            branding.favicon,
            branding.logo,
            branding.logo_dark,
            branding.dark_logo,
        ),
        origin,
    );

    return (
        <Head title={finalTitle || siteName}>
            {finalDescription ? (
                <meta
                    head-key="description"
                    name="description"
                    content={finalDescription}
                />
            ) : null}
            {finalKeywords ? (
                <meta
                    head-key="keywords"
                    name="keywords"
                    content={finalKeywords}
                />
            ) : null}
            {robots ? (
                <meta head-key="robots" name="robots" content={robots} />
            ) : null}
            {resolvedCanonical ? (
                <link
                    head-key="canonical"
                    rel="canonical"
                    href={resolvedCanonical}
                />
            ) : null}
            {favicon ? (
                <link head-key="favicon" rel="icon" href={favicon} />
            ) : null}
            {siteName ? (
                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content={siteName}
                />
            ) : null}
            {ogTitle ? (
                <meta head-key="og:title" property="og:title" content={ogTitle} />
            ) : null}
            {ogDescription ? (
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={ogDescription}
                />
            ) : null}
            {ogType ? (
                <meta head-key="og:type" property="og:type" content={ogType} />
            ) : null}
            {currentUrl ? (
                <meta head-key="og:url" property="og:url" content={currentUrl} />
            ) : null}
            {resolvedImage ? (
                <meta
                    head-key="og:image"
                    property="og:image"
                    content={resolvedImage}
                />
            ) : null}
            {twitterCard ? (
                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content={twitterCard}
                />
            ) : null}
            {twitterTitle ? (
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={twitterTitle}
                />
            ) : null}
            {twitterDescription ? (
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={twitterDescription}
                />
            ) : null}
            {twitterImage ? (
                <meta
                    head-key="twitter:image"
                    name="twitter:image"
                    content={twitterImage}
                />
            ) : null}
        </Head>
    );
}
