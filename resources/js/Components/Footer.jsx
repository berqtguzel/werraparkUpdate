import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { ensureLocaleInUrl } from "@/utils/url";
import {
    filterLegalItems,
    deduplicateByUrl,
    ensureTreeNoDuplicates,
    flattenTreeForNav,
} from "@/utils/menuUtils";
import "../../css/Footer.css";

const SOCIAL_ICONS = {
    facebook: (
        <path
            d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z"
            fill="currentColor"
        />
    ),
    instagram: (
        <>
            <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="12"
                cy="12"
                r="3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </>
    ),
    twitter: (
        <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
        />
    ),
    linkedin: (
        <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="currentColor"
        />
    ),
    youtube: (
        <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill="currentColor"
        />
    ),
};

const DEFAULTS = {
    logo: "/images/Logo/werrapark-logo.png",
    siteName: "Werrapark Resort",
    description:
        "Natur, Ruhe und Genuss im Thüringer Wald. Der Werrapark vereint komfortable Zimmer, regionale Kulinarik und vielfältige Aktivitäten – zu jeder Jahreszeit.",
    address:
        "R.-Breitscheid-Straße 41–45\n98574 Masserberg / Heubach\nDeutschland",
    email: "info@werrapark.de",
    phone: "+49 (0) 36870 / 800",
    ctaTitle: "Urlaub im Grünen – direkt zum Bestpreis buchen",
    ctaLabel: "Jetzt buchen",
    ctaHref: "/offers",
};

function useFooterData() {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const menu = Array.isArray(props?.global?.menu) ? props.global.menu : [];
    const settings = props?.global?.settings ?? {};
    const branding = settings.branding ?? {};
    const contact = settings.contact ?? {};
    const social = settings.social ?? {};
    const footerSettings = settings.footer ?? {};

    const data = useMemo(() => {
        const infos = contact.contact_infos ?? [];
        const primary = infos.find((c) => c.is_primary) ?? infos[0];
        const addr =
            contact.address ??
            (primary
                ? [primary.address, primary.city, primary.country]
                      .filter(Boolean)
                      .join("\n")
                : null) ??
            DEFAULTS.address;
        const email =
            contact.email ?? primary?.email ?? primary?.mail ?? DEFAULTS.email;
        const phone =
            contact.phone ??
            contact.mobile ??
            primary?.phone ??
            primary?.mobile ??
            DEFAULTS.phone;
        const website = contact.website ?? primary?.website ?? null;
        const mapUrl = contact.map ?? primary?.map ?? null;

        const socialList = [
            social.facebook && {
                key: "facebook",
                href: social.facebook,
                label: "Facebook",
            },
            social.instagram && {
                key: "instagram",
                href: social.instagram,
                label: "Instagram",
            },
            social.twitter && {
                key: "twitter",
                href: social.twitter,
                label: "Twitter",
            },
            social.linkedin && {
                key: "linkedin",
                href: social.linkedin,
                label: "LinkedIn",
            },
            social.youtube && {
                key: "youtube",
                href: social.youtube,
                label: "YouTube",
            },
        ].filter(Boolean);

        const footerMenu =
            menu.find((m) =>
                ["footer", "Footer"].includes(m.location ?? m.type ?? m.slug),
            ) ??
            menu[1] ??
            null;
        const rawItems = ensureTreeNoDuplicates(
            footerMenu?.items ?? footerMenu?.children ?? [],
        );
        const flatItems = flattenTreeForNav(rawItems);
        const rawNavItems = flatItems.map(
            (item) => ({
                id: item.id ?? item.slug ?? item.name,
                name: item.name ?? item.title ?? "Link",
                url: ensureLocaleInUrl(
                    item.url?.startsWith("http") || item.url?.startsWith("/")
                        ? item.url
                        : `/${locale}/${item.slug ?? item.url ?? ""}`,
                    locale,
                ),
                key: item.slug ?? item.key ?? "",
            }),
        );
        const navItemsFiltered = deduplicateByUrl(
            filterLegalItems(rawNavItems),
        );
        const navItems = navItemsFiltered.length
            ? navItemsFiltered
            : [
                  { id: "offers", name: "Angebote", url: `/${locale}/offers` },
                  { id: "galerie", name: "Galerie", url: `/${locale}/galerie` },
              ];

        const legalLinks = [
            { name: "Datenschutz", url: `/${locale}/privacy`, key: "privacy" },
            { name: "AGB", url: `/${locale}/agb`, key: "agb" },
            {
                name: "Impressum",
                url: `/${locale}/impressum`,
                key: "impressum",
            },
            { name: "Kontakt", url: `/${locale}/kontakt`, key: "kontakt" },
        ];

        return {
            locale,
            logo: branding.logo ?? branding.logo_dark ?? DEFAULTS.logo,
            siteName:
                branding.site_name ??
                branding.siteName ??
                footerSettings.footer_copyright ??
                DEFAULTS.siteName,
            description: footerSettings.footer_text ?? DEFAULTS.description,
            address: addr,
            email,
            phone,
            website,
            mapUrl,
            contactInfos: infos,
            social: socialList,
            navItems,
            legalLinks,
            ctaTitle:
                footerSettings.cta_title ??
                footerSettings.ctaTitle ??
                DEFAULTS.ctaTitle,
            ctaLabel:
                footerSettings.cta_label ??
                footerSettings.ctaLabel ??
                DEFAULTS.ctaLabel,
            ctaHref:
                footerSettings.cta_href ??
                footerSettings.ctaHref ??
                DEFAULTS.ctaHref,
            navTitle: footerMenu?.name ?? "Schnellzugriff",
            showNewsletter: footerSettings.show_newsletter ?? true,
        };
    }, [locale, props?.global?.menu, props?.global?.settings]);

    return data;
}

function SocialLink({ item }) {
    const Icon = SOCIAL_ICONS[item.key];
    if (!Icon) return null;
    return (
        <a
            href={item.href}
            aria-label={item.label}
            className="wh-foot-social"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                {Icon}
            </svg>
        </a>
    );
}

function ContactBlock({ address, email, phone, website, mapUrl }) {
    const lines = (address || "").split("\n").filter(Boolean);
    const hasLinks = phone || email || website || mapUrl;
    if (!lines.length && !hasLinks) return null;

    return (
        <div className="wh-foot-contact">
            {lines.length > 0 && (
                <address className="wh-foot-address not-italic">
                    {lines.map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < lines.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </address>
            )}
            {hasLinks && (
                <div className="wh-foot-links">
                    {phone && (
                        <a
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="wh-foot-link"
                        >
                            {phone}
                        </a>
                    )}
                    {email && (
                        <a href={`mailto:${email}`} className="wh-foot-link">
                            {email}
                        </a>
                    )}
                    {website && (
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wh-foot-link"
                        >
                            {website
                                .replace(/^https?:\/\//, "")
                                .replace(/\/$/, "")}
                        </a>
                    )}
                    {mapUrl && (
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wh-foot-link"
                        >
                            Karte anzeigen
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Footer() {
    const d = useFooterData();
    const year = new Date().getFullYear();

    return (
        <footer className="wh-foot" role="contentinfo">
            <div className="wh-foot-cta">
                <div className="wh-container wh-foot-cta__inner">
                    <h3>{d.ctaTitle}</h3>
                    <a
                        href={ensureLocaleInUrl(d.ctaHref, d.locale)}
                        className="wh-btn wh-btn--invert"
                        data-track
                        data-track-id="footer-cta"
                        data-track-label={d.ctaLabel}
                    >
                        {d.ctaLabel}
                    </a>
                </div>
            </div>

            <div className="wh-foot-main">
                <div className="wh-container wh-foot-grid">
                    <div className="wh-foot-col wh-foot-col--brand">
                        <a
                            href="/"
                            className="wh-foot-brand"
                            aria-label="Startseite"
                        >
                            <img
                                src={d.logo}
                                alt={d.siteName}
                                className="wh-foot-logo"
                            />
                        </a>
                        <p className="wh-foot-text">{d.description}</p>
                        {d.social.length > 0 && (
                            <div
                                className="wh-foot-socials"
                                aria-label="Social Media"
                            >
                                {d.social.map((s) => (
                                    <SocialLink key={s.key} item={s} />
                                ))}
                            </div>
                        )}
                    </div>

                    <nav className="wh-foot-col" aria-label={d.navTitle}>
                        <h4 className="wh-foot-title">{d.navTitle}</h4>
                        <ul className="wh-foot-list">
                            {d.navItems.map((item) => (
                                <li key={item.id}>
                                    <a href={item.url}>{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="wh-foot-col">
                        <h4 className="wh-foot-title">Kontakt</h4>
                        <ContactBlock
                            address={d.address}
                            email={d.email}
                            phone={d.phone}
                            website={d.website}
                            mapUrl={d.mapUrl}
                        />
                        {d.contactInfos.length > 1 && (
                            <div className="wh-foot-extra-contacts">
                                {d.contactInfos.slice(1, 3).map((c) => (
                                    <div key={c.id} className="wh-foot-extra">
                                        {c.title && (
                                            <span className="wh-foot-extra-title">
                                                {c.title}
                                            </span>
                                        )}
                                        {c.phone && (
                                            <a
                                                href={`tel:${c.phone.replace(/\s/g, "")}`}
                                            >
                                                {c.phone}
                                            </a>
                                        )}
                                        {c.email && (
                                            <a href={`mailto:${c.email}`}>
                                                {c.email}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {d.showNewsletter && (
                            <form
                                className="wh-foot-news"
                                onSubmit={(e) => e.preventDefault()}
                                aria-label="Newsletter"
                            >
                                <label htmlFor="news-email" className="sr-only">
                                    E-Mail
                                </label>
                                <input
                                    id="news-email"
                                    type="email"
                                    placeholder="Ihre E-Mail-Adresse"
                                    className="wh-input"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="wh-btn wh-btn--primary"
                                >
                                    Newsletter
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="wh-foot-bottom">
                <div className="wh-container wh-foot-bottom__inner">
                    <p className="wh-foot-copy">
                        &copy; {year} {d.siteName}
                    </p>
                    <ul className="wh-foot-mini">
                        {d.legalLinks.map((l) => (
                            <li key={l.key}>
                                <a href={l.url}>{l.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
