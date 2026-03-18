import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import OFFERS from "@/Data/OffersData";
import { useTranslation } from "@/i18n";
import "@/../css/offer-detail.css";

const OFFER_MAP = OFFERS.reduce((acc, o) => {
    acc[o.id] = o;
    return acc;
}, {});

export default function OfferShow({ offer: offerId }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const { t } = useTranslation();
    const base = OFFER_MAP[offerId] ?? OFFERS[0];

    const title = base.subtitle
        ? `${base.title} – ${base.subtitle}`
        : base.title;

    return (
        <AppLayout currentRoute="offers">
            <Head title={title} />
            <section className="of-wrap" aria-labelledby="offer-title">
                <div className="of-hero">
                    <div className="of-hero-inner">
                        <img
                            src={base.image}
                            alt={base.alt || base.title}
                            className="of-hero-bg"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="of-hero-layout">
                            <div className="of-hero-copy">
                                <p className="of-eyebrow">
                                    {t("offerDetail.eyebrow")} • Werrapark Resort
                                </p>
                                <h1 id="offer-title" className="of-title">
                                    {title}
                                </h1>
                                <p className="of-intro">
                                    {t("offerDetail.intro")}
                                </p>
                            </div>

                            <div className="of-hero-badge" aria-hidden="true">
                                <span className="of-hero-tag">
                                    {t("offerDetail.limitedBadge")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="of-layout">
                    <article className="of-main">
                        <div className="of-card">
                            <h2 className="of-card-title">
                                {t("offerDetail.servicesTitle")}
                            </h2>
                            <ul className="of-list">
                                <li>{t("offerDetail.service1")}</li>
                                <li>{t("offerDetail.service2")}</li>
                                <li>{t("offerDetail.service3")}</li>
                                <li>{t("offerDetail.service4")}</li>
                            </ul>
                        </div>
                    </article>

                    <aside className="of-aside" aria-label={t("offerDetail.priceTitle")}>
                        <div className="of-aside-card">
                            <h2 className="of-aside-title">
                                {t("offerDetail.priceTitle")}
                            </h2>
                            <p className="of-text">
                                {t("offerDetail.priceText")}
                            </p>
                            <div className="of-actions">
                                <a
                                    href={`/${locale}/kontakt`}
                                    className="of-btn of-btn--primary"
                                >
                                    {t("offerDetail.requestBtn")}
                                </a>
                                <a
                                    href="/"
                                    className="of-btn of-btn--ghost"
                                >
                                    {t("offerDetail.moreOffersBtn")}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}
