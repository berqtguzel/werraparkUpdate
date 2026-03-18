import React from "react";
import "../../../css/team-grid.css";
import demoTeam from "@/Data/demoData";
import { useTranslation } from "@/i18n";
import { usePage } from "@inertiajs/react";

const Particles = React.lazy(() =>
    import("../ReactBits/Backgrounds/Particles").then((m) => ({
        default: m.default || m,
    })),
);
const norm = (s = "") =>
    s
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();

function NameBar({ name }) {
    return (
        <div className="tg-namebar">
            <span className="tg-namebar__text">{name}</span>
        </div>
    );
}

function TeamMedia({ src, name }) {
    return (
        <div className="tg-media">
            <img
                src={src}
                alt={`${name || "Profil"} image`}
                className="tg-media__img"
            />
            <span className="tg-media__overlay" aria-hidden="true" />
            <span className="tg-media__shine" aria-hidden="true" />
            <NameBar name={name} />
        </div>
    );
}

function CardInfo({ title, email, phone, website }) {
    const { t } = useTranslation();
    return (
        <div className="tg-info">
            {title && (
                <div className="tg-info__title">
                    {String(title).replace(/\n/g, " - ")}
                </div>
            )}
            <div className="tg-contacts">
                {phone && (
                    <a
                        className="tg-chip tg-chip--link"
                        href={`tel:${phone}`}
                        aria-label={t("team.call")}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.48a1 1 0 0 1 1 1c0 1.3.19 2.5.56 3.6a1 1 0 0 1-.24 1L6.6 10.8Z"
                            />
                        </svg>
                        <span>{phone}</span>
                    </a>
                )}
                {email && (
                    <a
                        className="tg-chip tg-chip--link"
                        href={`mailto:${email}`}
                        aria-label={t("team.email")}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
                            />
                        </svg>
                        <span>{t("team.email")}</span>
                    </a>
                )}
                {website && (
                    <a
                        className="tg-chip tg-chip--link"
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1-1.41-1.41 1-1a3 3 0 0 0-4.24-4.24l-2 2A3 3 0 1 0 14 12l1-1 1.41 1.41-1 1a5 5 0 0 1-7 0Zm4-2a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1L7.41 13l-1 1a3 3 0 0 0 4.24 4.24l2-2A3 3 0 0 0 12 12l-1 1L9.59 11l1-1a5 5 0 0 1 7 0Z"
                            />
                        </svg>
                        <span>{t("team.web")}</span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function TeamGrid({ people }) {
    const { t } = useTranslation();
    const { props } = usePage();
    const apiStaff = props?.global?.staff ?? [];
    const list =
        Array.isArray(people) && people.length
            ? people
            : Array.isArray(apiStaff) && apiStaff.length
              ? apiStaff
              : demoTeam;

    let leadIdx = list.findIndex((p) =>
        norm(p.name || "").includes("sezai koc"),
    );
    if (leadIdx < 0) leadIdx = 0;
    const lead = list[leadIdx];
    const ordered = [lead, ...list.filter((_, i) => i !== leadIdx)].filter(
        Boolean,
    );

    return (
        <section className="tg-section tg-meshbg">
            <div className="tg-pattern" aria-hidden="true" />

            <React.Suspense fallback={null}>
                <div className="tt3-particles-layer" aria-hidden="true">
                    <Particles
                        className="tt3-particles"
                        particleCount={90}
                        particleSpread={8}
                        speed={0.035}
                        moveParticlesOnHover
                        particleHoverFactor={0.35}
                        alphaParticles
                        particleBaseSize={120}
                        sizeRandomness={0.6}
                        cameraDistance={18}
                        particleColors={["#19bf73", "#0ea567", "#8ee7c8"]}
                    />
                </div>
            </React.Suspense>

            <div className="tg-shell">
                <header className="tg-head">
                    <span className="tg-eyebrow">werrapark</span>
                    <h2 className="tg-heading">{t("team.heading")}</h2>
                    <p className="tg-sub">{t("team.subtitle")}</p>
                </header>

                <div className="tg-grid">
                    {ordered.map((p, i) => {
                        const src =
                            p.image ||
                            p.avatar ||
                            "/images/avatar-placeholder.png";
                        return (
                            <article
                                className={`tg-card ${i === 0 ? "is-lead" : ""}`}
                                key={p.email || p.name || i}
                            >
                                <TeamMedia src={src} name={p.name} />
                                <CardInfo
                                    title={p.title}
                                    email={p.email}
                                    phone={p.phone || p.tel || p.mobile}
                                    website={p.website || p.url}
                                />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
