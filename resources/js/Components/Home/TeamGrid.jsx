import React from "react";
import "../../../css/team-grid.css";
import demoTeam from "@/Data/demoData";
import ProfileCard from "../ReactBits/Components/ProfileCard";

/* ---------------------------
   Yardımcılar
--------------------------- */
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

/* Tema sınıfını izleyip “light” mı diye söyleyen ufak hook */
function useIsLightTheme() {
    const [isLight, setIsLight] = React.useState(() =>
        typeof document !== "undefined"
            ? document.documentElement.classList.contains("light")
            : false
    );

    React.useEffect(() => {
        if (typeof document === "undefined") return;
        const el = document.documentElement;
        const obs = new MutationObserver(() =>
            setIsLight(el.classList.contains("light"))
        );
        obs.observe(el, { attributes: true, attributeFilter: ["class"] });
        return () => obs.disconnect();
    }, []);

    return isLight;
}

/* ---------------------------
   Statik varlıklar
--------------------------- */
const LOGO_PATTERN = "/images/logo/werrapark.png";
const GRAIN_TEXTURE = "/assets/demo/grain.webp";
/** arka plana koymak istediğin PNG */
const PNG_BG_URL = "/assets/demo/your-bg.png"; // <- kendi dosya yolun

/* ---------------------------
   Kart efektleri (tema-dereceli)
--------------------------- */

/* Koyu tema */
const BEHIND_DARK = `
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

const INNER_DARK = `
linear-gradient(145deg, hsl(102.46 40% 45% / 85%) 0%, rgba(255,255,255,.07) 100%)
`;

/* Açık tema */
const BEHIND_LIGHT = `
radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),
  rgba(255,255,255,.12) 6%,
  hsl(136 70% 88%) 14%,
  hsl(141 75% 63%) 48%,
  hsla(29,0%,60%,0) 100%),
radial-gradient(35% 52% at 55% 22%, hsl(141 95% 78%) 0%, transparent 100%),
radial-gradient(100% 100% at 50% 50%, hsl(140 70% 86%) 1%, transparent 78%),
conic-gradient(from 124deg at 50% 50%,
  hsl(144 85% 70%) 0%,
  hsl(141 92% 72%) 40%, hsl(141 92% 72%) 60%,
  hsl(135 82% 84%) 100%)
`;

const INNER_LIGHT = `
linear-gradient(145deg, hsl(140 40% 70% / 65%) 0%, rgba(255,255,255,.18) 100%)
`;

/* ---------------------------
   Bileşen
--------------------------- */
export default function TeamGrid({ people = [], heading = "Unser Team" }) {
    const list = people.length ? people : demoTeam;
    const leader = list[0];
    const members = list.slice(1, 4);

    const isLight = useIsLightTheme();

    const behindGradient = isLight ? BEHIND_LIGHT : BEHIND_DARK;
    const innerGradient = isLight ? INNER_LIGHT : INNER_DARK;

    // PNG + gradient birlikte (PNG ilk katman)
    const behindWithPng = `url('${PNG_BG_URL}'), ${behindGradient}`;

    return (
        <section className="tg-section tg-section--galaxy-canvas">
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
                            behindGradient={behindWithPng} // PNG + gradient
                            innerGradient={innerGradient}
                            showBehindGradient
                            enableTilt
                            enableMobileTilt={true} // mobilde tilt açık
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
                            behindGradient={behindWithPng} // PNG + gradient
                            innerGradient={innerGradient}
                            showBehindGradient
                            enableTilt
                            enableMobileTilt={true} // mobilde tilt açık
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
