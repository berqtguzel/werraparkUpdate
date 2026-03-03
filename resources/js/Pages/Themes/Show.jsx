import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import "@/../css/theme-detail.css";

const THEME_CONTENT = {
    wellness: {
        title: "Erholungshotel – Wellness & Entspannung",
        eyebrow: "Urlaubsthema",
        intro: "Ankommen, durchatmen und den Alltag hinter sich lassen – im Werrapark Resort erwartet Sie ein Rückzugsort mitten im Thüringer Wald.",
        image: "/images/template1.webp",
        highlights: [
            "Innenpool, Sauna & Ruhebereiche mit Blick ins Grüne",
            "Regionale Küche mit leichten, vitalen Gerichten",
            "Kurze Wege zwischen Zimmern, Spa und Restaurant",
            "Wandern, Spazieren und frische Waldluft direkt vor der Tür",
        ],
    },
    biker: {
        title: "Motorradtour – Kurven, Panorama & Genuss",
        eyebrow: "Urlaubsthema",
        intro: "Die perfekten Kurven, weite Ausblicke und gemütlicher Ausklang am Abend – das Werrapark Resort ist Ihr Basislager für Motorradtouren im Thüringer Wald.",
        image: "/images/template2.png",
        highlights: [
            "Kurvenreiche Strecken direkt ab Hotel",
            "Sichere Abstellmöglichkeiten für Motorräder",
            "Tourenvorschläge & Geheimtipps vom Team",
            "Gemütliche Abende auf der Terrasse oder im Restaurant",
        ],
    },
    massage: {
        title: "Massagen & Anwendungen – Tiefes Wohlbefinden",
        eyebrow: "Wohlfühlmomente",
        intro: "Ob klassische Massage, Hot-Stone oder individuelle Anwendung – gönnen Sie sich Zeit nur für sich.",
        image: "/images/template3.png",
        highlights: [
            "Klassische Rücken- und Ganzkörpermassagen",
            "Hot-Stone & Aromaöl-Anwendungen",
            "Ruhige Behandlungsräume mit warmer Lichtstimmung",
            "Kombinierbar mit Sauna- und Poolnutzung",
        ],
    },
    catering: {
        title: "Catering – Frisch, regional & anlassbezogen",
        eyebrow: "Für Ihr Event",
        intro: "Ob Familienfeier, Firmenevent oder Vereinsjubiläum – wir gestalten Ihr Catering passend zum Anlass.",
        image: "/images/blockhaus.jpeg",
        highlights: [
            "Individuelle Menü- und Buffetvorschläge",
            "Regionale Zutaten und saisonale Ideen",
            "Optionen für vegetarische & vegane Gäste",
            "Organisation vor Ort oder außer Haus nach Absprache",
        ],
    },
    wedding: {
        title: "Hochzeitssaal – Ihr Tag im Grünen",
        eyebrow: "Feiern im Werrapark",
        intro: "Sagen Sie Ja im Werrapark Resort – mit flexiblen Räumen, stilvollem Ambiente und Rundum-Betreuung.",
        image: "/images/template2.png",
        highlights: [
            "Flexible Bestuhlung und verschiedene Raumgrößen",
            "Gemeinsame Planung von Dekoration & Ablauf",
            "Menüs & Buffets nach Ihren Wünschen",
            "Übernachtungsmöglichkeiten für Ihre Gäste",
        ],
    },
    camp: {
        title: "Fußballcamp – Training, Teamgeist & Natur",
        eyebrow: "Für Kids & Teams",
        intro: "Spaß am Ball, professionelle Betreuung und viel frische Luft – das Fußballcamp im Werrapark Resort.",
        image: "/images/rooms/room.png",
        highlights: [
            "Trainingszeiten auf nahegelegenen Plätzen",
            "Erfahrene Trainer & betreutes Rahmenprogramm",
            "Ausgewogene Verpflegung für sportliche Kids",
            "Spiel, Spaß und Erholung im und rund ums Resort",
        ],
    },
};

export default function ThemeShow({ theme }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const data = THEME_CONTENT[theme] ?? THEME_CONTENT["wellness"];

    return (
        <AppLayout currentRoute="urlaubsthemen">
            <Head title={data.title} />
            <section className="td-wrap" aria-labelledby="theme-title">
                <div className="td-hero">
                    <div className="td-hero-inner">
                        <div className="td-hero-layout">
                            <div className="td-hero-copy">
                                <p className="td-eyebrow">
                                    {data.eyebrow} •{" "}
                                    {locale === "de"
                                        ? "Werrapark Resort"
                                        : "Werrapark Resort"}
                                </p>
                                <h1 id="theme-title" className="td-title">
                                    {data.title}
                                </h1>
                                <p className="td-intro">{data.intro}</p>
                            </div>

                            <div className="td-hero-media" aria-hidden="true">
                                <div className="td-hero-img-wrap">
                                    <img
                                        src={data.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="td-hero-grad" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="td-layout">
                    <article className="td-main">
                        <div className="td-card">
                            <h2 className="td-card-title">
                                {locale === "de"
                                    ? "Das erwartet Sie"
                                    : "What awaits you"}
                            </h2>
                            <ul className="td-list">
                                {data.highlights.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="td-card td-card--soft">
                            <h2 className="td-card-title">
                                {locale === "de"
                                    ? "Perfekt für"
                                    : "Perfect for"}
                            </h2>
                            <p className="td-text">
                                {locale === "de"
                                    ? "Paare, Familien und Gruppen, die Natur, Komfort und persönliche Betreuung schätzen."
                                    : "Couples, families and groups who value nature, comfort and personal service."}
                            </p>
                        </div>
                    </article>

                    <aside className="td-aside" aria-label="Buchung & Kontakt">
                        <div className="td-aside-card">
                            <h2 className="td-aside-title">
                                {locale === "de"
                                    ? "Angebot anfragen"
                                    : "Request an offer"}
                            </h2>
                            <p className="td-text">
                                {locale === "de"
                                    ? "Sie möchten dieses Urlaubsthema für Ihren Aufenthalt nutzen? Schreiben Sie uns – wir erstellen Ihnen gern ein individuelles Angebot."
                                    : "Interested in this holiday theme? Get in touch and we'll create an individual offer for you."}
                            </p>
                            <div className="td-actions">
                                <a
                                    href="/kontakt"
                                    className="td-btn td-btn--primary"
                                >
                                    {locale === "de"
                                        ? "Kontakt aufnehmen"
                                        : "Contact us"}
                                </a>
                                <a
                                    href="/offers"
                                    className="td-btn td-btn--ghost"
                                >
                                    {locale === "de"
                                        ? "Bestpreis buchen"
                                        : "Book best price"}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}


