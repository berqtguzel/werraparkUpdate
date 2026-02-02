import React from "react";
import "../../../css/team-grid.css";
import demoTeam from "@/Data/demoData";
import TiltedCard from "../ReactBits/Components/TiltedCard";

/* yardımcılar */
const norm = (s = "") =>
    s
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();
function buildHandle(email = "", fallback = "") {
    if (!email) return fallback || "";
    const [local, domain] = String(email).toLowerCase().split("@");
    const GENERIC = new Set([
        "info",
        "kontakt",
        "hello",
        "support",
        "contact",
        "empfang",
    ]);
    if (GENERIC.has(local) && domain) return domain.split(".")[0];
    return local || fallback || "";
}

/* üst isim bandı */
function NameBar({ name }) {
    return (
        <div className="tg-namebar">
            <span className="tg-namebar__text">{name}</span>
        </div>
    );
}

/* alt bilgi/iletişim */
function CardInfo({ title, handle, email, phone, website }) {
    return (
        <div className="tg-info">
            {title && <div className="tg-info__title">{title}</div>}
            <div className="tg-contacts">
                {handle && <span className="tg-chip">@{handle}</span>}
                {email && (
                    <a
                        className="tg-chip tg-chip--link"
                        href={`mailto:${email}`}
                        aria-label="E-Mail senden"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
                            />
                        </svg>
                        <span>E-Mail</span>
                    </a>
                )}
                {phone && (
                    <a className="tg-chip tg-chip--link" href={`tel:${phone}`} aria-label="Anrufen">
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.48a1 1 0 0 1 1 1c0 1.3.19 2.5.56 3.6a1 1 0 0 1-.24 1L6.6 10.8Z"
                            />
                        </svg>
                        <span>Anrufen</span>
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
                        <span>Web</span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function TeamGrid({
    heading = "Unser Team",
    people = demoTeam,
}) {
    const list = Array.isArray(people) && people.length ? people : demoTeam;

    let leadIdx = list.findIndex((p) =>
        norm(p.name || "").includes("sezai koc")
    );
    if (leadIdx < 0) leadIdx = 0;
    const lead = list[leadIdx];
    const others = list.filter((_, i) => i !== leadIdx);

    const leadHandle = buildHandle(lead?.email, lead?.handle);

    return (
        <section className="tg-section tg-meshbg">
            <div className="tg-pattern" aria-hidden="true" />
            <div className="tg-shell">
                <header className="tg-head">
                    <span className="tg-eyebrow">werrapark</span>
                    <h2 className="tg-heading">{heading}</h2>
                    <p className="tg-sub">
                        Lernen Sie die Menschen kennen, die Ihren Aufenthalt besonders machen.
                    </p>
                </header>

                <div className="tg-hero">
                    <article className="tg-card tg-card--hero">
                        <TiltedCard
                            imageSrc={
                                lead?.image ||
                                lead?.avatar ||
                                "/images/avatar-placeholder.png"
                            }
                            altText={`${lead?.name || "Profil"} image`}
                            captionText=""
                            containerWidth="100%"
                            containerHeight="440px"
                            imageWidth="100%"
                            imageHeight="100%"
                            scaleOnHover={1.06}
                            rotateAmplitude={12}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent
                            overlayContent={<NameBar name={lead?.name} />}
                        />
                        <CardInfo
                            title={lead?.title}
                            handle={leadHandle}
                            email={lead?.email}
                            phone={lead?.phone || lead?.tel || lead?.mobile}
                            website={lead?.website || lead?.url}
                        />
                    </article>
                </div>

                <div className="tg-grid tg-grid--row">
                    {others.map((p, i) => {
                        const handle = buildHandle(p.email, p.handle);
                        const src =
                            p.image ||
                            p.avatar ||
                            "/images/avatar-placeholder.png";
                        return (
                            <article
                                className="tg-card tg-card--equal"
                                key={p.email || p.name || i}
                            >
                                <TiltedCard
                                    imageSrc={src}
                                    altText={`${p.name || "Profil"} image`}
                                    captionText=""
                                    containerWidth="100%"
                                    containerHeight="360px"
                                    imageWidth="100%"
                                    imageHeight="100%"
                                    scaleOnHover={1.05}
                                    rotateAmplitude={10}
                                    showMobileWarning={false}
                                    showTooltip={false}
                                    displayOverlayContent
                                    overlayContent={<NameBar name={p.name} />}
                                />
                                <CardInfo
                                    title={p.title}
                                    handle={handle}
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
