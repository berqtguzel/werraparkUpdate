// resources/js/Components/Home/TeamGrid.jsx
import React from "react";
import "../../../css/team-grid.css";
import demoTeam from "@/Data/demoData";
import ProfileCard from "../ReactBits/Components/ProfileCard";
import Galaxy from "../ReactBits/Backgrounds/Galaxy";

/** e-postadan handle üretimi */
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

/** statik varlıklar */
const LOGO_PATTERN = "/images/logo/logo-mark.svg";
const GRAIN_TEXTURE = "/assets/demo/grain.webp";

/** kartların arka plan/inner efektleri */
const BEHIND = `
radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),
  rgba(255,255,255,.07) 4%,
  hsl(116.91 50% 80%) 10%,
  hsl(119.6 90.41% 52.27%) 50%,
  hsla(29,0%,60%,0) 100%),
radial-gradient(35% 52% at 55% 20%, hsl(97 100% 70%) 0%, transparent 100%),
radial-gradient(100% 100% at 50% 50%, hsl(106.92 71.17% 75.93%) 1%, transparent 76%),
conic-gradient(from 124deg at 50% 50%,
  hsl(106.96 85.6% 62.74%) 0%,
  hsl(97 100% 70%) 40%, hsl(97 100% 70%) 60%,
  hsl(121.85 90.4% 76.92%) 100%)
`;

const INNER = `
linear-gradient(145deg, hsl(102.46 40% 45% / 85%) 0%, rgba(255,255,255,.07) 100%)
`;

const LIGHT_MINT = ["#5EF38C", "#67E8F9", "#A5F3FC", "#D9F99D"];

export default function TeamGrid({
    people = [],
    colors = LIGHT_MINT,
    heading = "Unser Team",
}) {
    const list = people.length ? people : demoTeam;
    const leader = list[0];
    const members = list.slice(1, 4);

    // Canvas bileşenini yalnızca client’ta render et
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => setIsClient(true), []);

    return (
        <section className="tg-section tg-section--galaxy-canvas">
            {/* Galaxy arka plan (tam sayfa değil, sadece bu bölüm) */}

            <div className="tg-galaxy" aria-hidden>
                <Galaxy
                    focal={[0.5, 0.32]}
                    rotation={[1.0, 0.15]}
                    rotationSpeed={0.06}
                    speed={1.0}
                    starSpeed={0.55}
                    density={1.15}
                    /* renkler canlı kalsın */
                    saturation={0.85} // 0=grayscale, 1=full
                    hueShift={140} // 0–360 (140: yeşil/akuar; renk paletine göre değiştir)
                    glowIntensity={0.38}
                    twinkleIntensity={0.35}
                    mouseInteraction
                    mouseRepulsion
                    repulsionStrength={1.6}
                    transparent // siyah zemin bizim CSS’ten geliyor
                />
            </div>

            <div className="tg-shell">
                <h2 className="tg-heading">{heading}</h2>

                {leader && (
                    <div className="tg-lead">
                        <ProfileCard
                            className="tg-card"
                            avatarUrl={
                                leader.avatar ||
                                "/images/avatar-placeholder.png"
                            }
                            miniAvatarUrl={
                                leader.avatar ||
                                "/images/avatar-placeholder.png"
                            }
                            iconUrl={LOGO_PATTERN}
                            grainUrl={GRAIN_TEXTURE}
                            behindGradient={BEHIND}
                            innerGradient={INNER}
                            showBehindGradient
                            enableTilt
                            enableMobileTilt={false}
                            mobileTiltSensitivity={5}
                            name={leader.name}
                            title={leader.title}
                            handle={buildHandle(leader.email, leader.handle)}
                            status="online"
                            contactText="E-Mail"
                            showUserInfo
                            onContactClick={() =>
                                leader.email &&
                                (window.location.href = `mailto:${leader.email}`)
                            }
                        />
                    </div>
                )}

                <div className="tg-row-3">
                    {members.map((p) => (
                        <ProfileCard
                            key={p.email || p.name}
                            className="tg-card"
                            avatarUrl={
                                p.avatar || "/images/avatar-placeholder.png"
                            }
                            miniAvatarUrl={
                                p.avatar || "/images/avatar-placeholder.png"
                            }
                            iconUrl={LOGO_PATTERN}
                            grainUrl={GRAIN_TEXTURE}
                            behindGradient={BEHIND}
                            innerGradient={INNER}
                            showBehindGradient
                            enableTilt
                            enableMobileTilt={false}
                            mobileTiltSensitivity={5}
                            name={p.name}
                            title={p.title}
                            handle={buildHandle(p.email, p.handle)}
                            status="online"
                            contactText="E-Mail"
                            showUserInfo
                            onContactClick={() =>
                                p.email &&
                                (window.location.href = `mailto:${p.email}`)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
