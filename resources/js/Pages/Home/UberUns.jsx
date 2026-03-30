import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import TeamGrid from "@/Components/Home/TeamGrid";
import SeoHead from "@/Components/SeoHead";
import { useTranslation } from "@/i18n";
import "../../../css/uber-uns.css";

function pickText(value, fallback) {
    if (value == null) return fallback;
    const s = String(value).trim();
    return s !== "" ? s : fallback;
}

export default function UberUns({
    currentRoute = "uberuns",
    page: pageFromServer = null,
}) {
    const { t, locale } = useTranslation();
    const page = pageFromServer;

    const DATA = {
        hero: {
            eyebrow: "Werrapark",
            title: pickText(page?.title, t("about.heroTitle")),
            subtitle: pickText(page?.subtitle, t("about.heroSubtitle")),
            content: pickText(page?.content, t("about.heroContent")),
            bgImage: pickText(page?.heroImage, "/images/template2.png"),
        },
        stats: [
            { label: t("about.statsExperience"), value: "25+" },
            { label: t("about.statsRooms"), value: "300+" },
            { label: t("about.statsSatisfaction"), value: "97%" },
            { label: t("about.statsEmployees"), value: "120+" },
        ],
        mission: {
            title: t("about.missionTitle"),
            text: t("about.missionText"),
            points: [
                t("about.missionPoint1"),
                t("about.missionPoint2"),
                t("about.missionPoint3"),
            ],
        },
        values: [
            {
                title: t("about.valuesHospitalityTitle"),
                text: t("about.valuesHospitalityText"),
            },
            {
                title: t("about.valuesQualityTitle"),
                text: t("about.valuesQualityText"),
            },
            {
                title: t("about.valuesSustainabilityTitle"),
                text: t("about.valuesSustainabilityText"),
            },
        ],
        timeline: [
            {
                year: "1999",
                title: t("about.timeline1Title"),
                text: t("about.timeline1Text"),
            },
            {
                year: "2008",
                title: t("about.timeline2Title"),
                text: t("about.timeline2Text"),
            },
            {
                year: "2017",
                title: t("about.timeline3Title"),
                text: t("about.timeline3Text"),
            },
            {
                year: "2024",
                title: t("about.timeline4Title"),
                text: t("about.timeline4Text"),
            },
        ],
        cta: {
            title: t("about.ctaTitle"),
            text: t("about.ctaText"),
            button: { label: t("about.ctaButton"), href: `/${locale}/kontakt` },
        },
    };

    return (
        <AppLayout currentRoute={currentRoute}>
            <SeoHead
                title={pickText(page?.title, t("about.pageTitle"))}
                description={pickText(page?.subtitle, "")}
                image={pickText(page?.heroImage, "")}
                meta={page?.meta}
            />
            <main className="uu">
                <section className="uu-hero uu-meshbg">
                    <div className="uu-hero__pattern" aria-hidden="true" />
                    {DATA.hero.bgImage && (
                        <div
                            className="uu-hero__bg"
                            style={{
                                backgroundImage: `url(${DATA.hero.bgImage})`,
                            }}
                            aria-hidden="true"
                        />
                    )}
                    <div className="uu-shell uu-hero__inner">
                        <span className="uu-eyebrow">{DATA.hero.eyebrow}</span>
                        <h1 className="uu-title">{DATA.hero.title}</h1>
                        <p className="uu-sub">{DATA.hero.subtitle}</p>
                    </div>
                </section>

                <section className="uu-shell uu-stats">
                    {DATA.stats.map((s, i) => (
                        <div className="uu-stat" key={i}>
                            <div className="uu-stat__value">{s.value}</div>
                            <div className="uu-stat__label">{s.label}</div>
                        </div>
                    ))}
                </section>

                <section className="uu-shell uu-split">
                    <div className="uu-pane">
                        <h2 className="uu-h2">{DATA.hero.title}</h2>
                        <div
                            className="uu-text"
                            dangerouslySetInnerHTML={{
                                __html: DATA.hero.content,
                            }}
                        />
                    </div>
                    <div className="uu-pane uu-pane--card">
                        <div className="uu-card">
                            <img
                                src={DATA.hero.heroImage}
                                alt={DATA.hero.imageAlt}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                <section className="uu-shell uu-values">
                    {DATA.values.map((v, i) => (
                        <article className="uu-value" key={i}>
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </article>
                    ))}
                </section>

                <section className="uu-shell uu-timeline">
                    <h2 className="uu-h2">{t("about.timelineTitle")}</h2>
                    <ol className="uu-steps">
                        {DATA.timeline.map((tl, i) => (
                            <li key={i} className="uu-step">
                                <div className="uu-step__dot" />
                                <div className="uu-step__year">{tl.year}</div>
                                <div className="uu-step__title">{tl.title}</div>
                                <div className="uu-step__text">{tl.text}</div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="uu-team">
                    <TeamGrid />
                </section>

                <section className="uu-cta">
                    <div className="uu-shell uu-cta__inner">
                        <h2 className="uu-cta__title">{DATA.cta.title}</h2>
                        <p className="uu-cta__text">{DATA.cta.text}</p>
                        <a className="uu-btn" href={DATA.cta.button.href}>
                            {DATA.cta.button.label}
                        </a>
                    </div>
                </section>
            </main>
        </AppLayout>
    );
}
