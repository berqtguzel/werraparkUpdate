import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import TeamGrid from "@/Components/Home/TeamGrid";
import "../../../css/uber-uns.css";

/** Düzenlenebilir içerik */
const DATA = {
    hero: {
        eyebrow: "Werrapark",
        title: "Über uns",
        subtitle:
            "Im Herzen des Thüringer Waldes bieten wir ein naturverbundenes, gästeorientiertes Erlebnis.",
        bgImage: "/images/template2.png", // isteğe bağlı
    },
    stats: [
        { label: "Jahre Erfahrung", value: "25+" },
        { label: "Zimmer & Wohnungen", value: "300+" },
        { label: "Zufriedenheit", value: "97%" },
        { label: "Mitarbeiter", value: "120+" },
    ],
    mission: {
        title: "Unsere Mission",
        text: `Unseren Gästen eine ruhige, warme und sichere Umgebung zu bieten und den nachhaltigen Tourismus zu stärken, indem wir lokale Kultur und Natur bewahren.`,
        points: [
            "Naturbewusster Betrieb und Nachhaltigkeit",
            "Transparenter, herzlicher und gästeorientierter Service",
            "Zusammenarbeit mit regionaler Wirtschaft und lokalen Produzenten",
        ],
    },
    values: [
        {
            title: "Gastfreundschaft",
            text: "Jeder Gast wird mit echter Herzlichkeit empfangen.",
        },
        {
            title: "Qualität",
            text: "Perfektion im Detail: Hygiene, Komfort und Genuss.",
        },
        {
            title: "Nachhaltigkeit",
            text: "Energie- und Wassereffizienz, Abfallmanagement, lokale Beschaffung.",
        },
    ],
    timeline: [
        {
            year: "1999",
            title: "Erste Eröffnung",
            text: "Grundstein der Marke Werrapark gelegt.",
        },
        {
            year: "2008",
            title: "Erweiterung",
            text: "Neue Zimmer und Wellnessbereich hinzugefügt.",
        },
        {
            year: "2017",
            title: "Digitalisierung",
            text: "Umstellung auf Online-Buchung und modernes CRM.",
        },
        {
            year: "2024",
            title: "Green Push",
            text: "Solarenergie und Abfallreduktionsprogramme.",
        },
    ],
    cta: {
        title: "Wir freuen uns, Sie willkommen zu heißen",
        text: "Bei Fragen kontaktieren Sie uns – unser Team hilft Ihnen gern.",
        button: { label: "Kontakt aufnehmen", href: "/kontakt" },
    },
};

export default function UberUns({ currentRoute = "uberuns" }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Über uns – Werrapark" />
        <main className="uu">
            {/* Hero */}
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

            {/* Hızlı istatistikler */}
            <section className="uu-shell uu-stats">
                {DATA.stats.map((s, i) => (
                    <div className="uu-stat" key={i}>
                        <div className="uu-stat__value">{s.value}</div>
                        <div className="uu-stat__label">{s.label}</div>
                    </div>
                ))}
            </section>

            {/* Misyon */}
            <section className="uu-shell uu-split">
                <div className="uu-pane">
                    <h2 className="uu-h2">{DATA.mission.title}</h2>
                    <p className="uu-text">{DATA.mission.text}</p>
                    <ul className="uu-list">
                        {DATA.mission.points.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>
                <div className="uu-pane uu-pane--card">
                    <div className="uu-card">
                        <img
                            src="/images/rooms/template2.png"
                            alt="Werrapark Nature"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Değerler */}
            <section className="uu-shell uu-values">
                {DATA.values.map((v, i) => (
                    <article className="uu-value" key={i}>
                        <h3>{v.title}</h3>
                        <p>{v.text}</p>
                    </article>
                ))}
            </section>

            {/* Zaman çizelgesi */}
            <section className="uu-shell uu-timeline">
                <h2 className="uu-h2">Unsere Geschichte</h2>
                <ol className="uu-steps">
                    {DATA.timeline.map((t, i) => (
                        <li key={i} className="uu-step">
                            <div className="uu-step__dot" />
                            <div className="uu-step__year">{t.year}</div>
                            <div className="uu-step__title">{t.title}</div>
                            <div className="uu-step__text">{t.text}</div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Ekip */}
            <section className="uu-team">
                <TeamGrid heading="Unser Team" />
            </section>

            {/* CTA */}
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
