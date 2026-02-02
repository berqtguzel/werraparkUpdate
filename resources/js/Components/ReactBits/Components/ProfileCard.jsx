import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "../../../../css/ReactBits/Components/ProfileCard.css";

const DEFAULT_BEHIND_GRADIENT =
    "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
    "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
    SMOOTH_DURATION: 600,
    INITIAL_DURATION: 1500,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    DEVICE_BETA_OFFSET: 20,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v, a, b, c, d) => round(c + ((d - c) * (v - a)) / (b - a));
const easeInOutCubic = (x) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
    avatarUrl = "<Placeholder for avatar URL>",
    iconUrl = "<Placeholder for icon URL>",
    grainUrl = "<Placeholder for grain URL>",
    behindGradient,
    innerGradient,
    showBehindGradient = true,
    className = "",
    enableTilt = true,
    enableMobileTilt = false,
    mobileTiltSensitivity = 5,
    miniAvatarUrl,
    name = "Javi A. Torres",
    title = "Software Engineer",
    handle = "javicodes",
    status = "Online",
    contactText = "Contact",
    showUserInfo = true,
    onContactClick,
}) => {
    const wrapRef = useRef(null);
    const cardRef = useRef(null);

    const animationHandlers = useMemo(() => {
        if (!enableTilt) return null;

        let rafId = null;

        const updateCardTransform = (offsetX, offsetY, card, wrap) => {
            const width = card.clientWidth || 1;
            const height = card.clientHeight || 1;

            const percentX = clamp((100 / width) * offsetX);
            const percentY = clamp((100 / height) * offsetY);

            const centerX = percentX - 50;
            const centerY = percentY - 50;

            const props = {
                "--pointer-x": `${percentX}%`,
                "--pointer-y": `${percentY}%`,
                "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
                "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
                "--pointer-from-center": `${clamp(
                    Math.hypot(percentY - 50, percentX - 50) / 50,
                    0,
                    1
                )}`,
                "--pointer-from-top": `${percentY / 100}`,
                "--pointer-from-left": `${percentX / 100}`,
                "--rotate-x": `${round(-(centerX / 5))}deg`,
                "--rotate-y": `${round(centerY / 4)}deg`,
            };

            for (const [k, v] of Object.entries(props))
                wrap.style.setProperty(k, v);
        };

        const animateToCenter = (duration, fromX, fromY, card, wrap) => {
            const start = performance.now();
            const targetX = wrap.clientWidth / 2;
            const targetY = wrap.clientHeight / 2;

            const loop = (t) => {
                const p = clamp((t - start) / duration);
                const e = easeInOutCubic(p);
                const x = adjust(e, 0, 1, fromX, targetX);
                const y = adjust(e, 0, 1, fromY, targetY);
                updateCardTransform(x, y, card, wrap);
                if (p < 1) rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);
        };

        return {
            updateCardTransform,
            animateToCenter,
            cancelAnimation: () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            },
        };
    }, [enableTilt]);

    const handlePointerMove = useCallback(
        (e) => {
            const card = cardRef.current;
            const wrap = wrapRef.current;
            if (!card || !wrap || !animationHandlers) return;

            const rect = card.getBoundingClientRect();
            animationHandlers.updateCardTransform(
                e.clientX - rect.left,
                e.clientY - rect.top,
                card,
                wrap
            );
        },
        [animationHandlers]
    );

    const handlePointerEnter = useCallback(() => {
        const card = cardRef.current;
        const wrap = wrapRef.current;
        if (!card || !wrap || !animationHandlers) return;
        animationHandlers.cancelAnimation();
        wrap.classList.add("active");
        card.classList.add("active");
    }, [animationHandlers]);

    const handlePointerLeave = useCallback(() => {
        const card = cardRef.current;
        const wrap = wrapRef.current;
        if (!card || !wrap || !animationHandlers) return;
        // bazı tarayıcılarda offsetX/Y yok -> merkezden animasyon
        const fromX = wrap.clientWidth / 2;
        const fromY = wrap.clientHeight / 2;
        animationHandlers.animateToCenter(
            ANIMATION_CONFIG.SMOOTH_DURATION,
            fromX,
            fromY,
            card,
            wrap
        );
        wrap.classList.remove("active");
        card.classList.remove("active");
    }, [animationHandlers]);

    const handleDeviceOrientation = useCallback(
        (event) => {
            const card = cardRef.current;
            const wrap = wrapRef.current;
            if (!card || !wrap || !animationHandlers) return;

            const { beta, gamma } = event; // x (tilt front/back), y (left/right)
            if (beta == null || gamma == null) return; // 0 değerini kaçırma

            const cx = card.clientWidth / 2;
            const cy = card.clientHeight / 2;

            // gamma sağ-sol, beta öne-arkaya: biraz yumuşat
            const x = cx + gamma * mobileTiltSensitivity;
            const y =
                cy +
                (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) *
                    mobileTiltSensitivity;

            animationHandlers.updateCardTransform(x, y, card, wrap);
        },
        [animationHandlers, mobileTiltSensitivity]
    );

    useEffect(() => {
        if (!enableTilt || !animationHandlers) return;

        const card = cardRef.current;
        const wrap = wrapRef.current;
        if (!card || !wrap) return;

        // performans & dokunmatik davranışı
        card.style.willChange = "transform";
        card.style.transformStyle = "preserve-3d";
        card.style.touchAction = enableMobileTilt ? "pan-y" : "auto"; // istersen "none"

        const resizeObs = new ResizeObserver(() => {
            // boyut değişince merkez konumları güncel kalsın
            animationHandlers.updateCardTransform(
                wrap.clientWidth / 2,
                wrap.clientHeight / 2,
                card,
                wrap
            );
        });
        resizeObs.observe(card);

        // Dinleyiciler
        card.addEventListener("pointerenter", handlePointerEnter);
        card.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });
        card.addEventListener("pointerleave", handlePointerLeave);

        // iOS izin akışı (Orientation için doğru API)
        const askOrientationPermission = () => {
            if (!enableMobileTilt) return;
            const needsPermission =
                typeof DeviceOrientationEvent !== "undefined" &&
                typeof DeviceOrientationEvent.requestPermission === "function";
            if (needsPermission) {
                DeviceOrientationEvent.requestPermission()
                    .then((state) => {
                        if (state === "granted") {
                            window.addEventListener(
                                "deviceorientation",
                                handleDeviceOrientation
                            );
                        }
                    })
                    .catch(console.error);
            } else {
                window.addEventListener(
                    "deviceorientation",
                    handleDeviceOrientation
                );
            }
        };
        // kullanıcı etkileşimiyle tetikle (iOS şartı)
        card.addEventListener("click", askOrientationPermission);

        // başlangıç animasyonu
        const ix = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
        const iy = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
        animationHandlers.updateCardTransform(ix, iy, card, wrap);
        animationHandlers.animateToCenter(
            ANIMATION_CONFIG.INITIAL_DURATION,
            ix,
            iy,
            card,
            wrap
        );

        return () => {
            card.removeEventListener("pointerenter", handlePointerEnter);
            card.removeEventListener("pointermove", handlePointerMove);
            card.removeEventListener("pointerleave", handlePointerLeave);
            card.removeEventListener("click", askOrientationPermission);
            window.removeEventListener(
                "deviceorientation",
                handleDeviceOrientation
            );
            resizeObs.disconnect();
            animationHandlers.cancelAnimation();
        };
    }, [
        enableTilt,
        enableMobileTilt,
        animationHandlers,
        handlePointerMove,
        handlePointerEnter,
        handlePointerLeave,
        handleDeviceOrientation,
    ]);

    const cardStyle = useMemo(
        () => ({
            "--icon": iconUrl ? `url(${iconUrl})` : "none",
            "--grain": grainUrl ? `url(${grainUrl})` : "none",
            "--behind-gradient": showBehindGradient
                ? behindGradient ?? DEFAULT_BEHIND_GRADIENT
                : "none",
            "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
        }),
        [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
    );

    const handleContactClick = useCallback(() => {
        onContactClick?.();
    }, [onContactClick]);

    return (
        <div
            ref={wrapRef}
            className={`pc-card-wrapper ${className}`.trim()}
            style={cardStyle}
        >
            <section
                ref={cardRef}
                className="pc-card"
                /* güvenli tarafta olmak için inline de ekliyoruz */
                style={{ touchAction: enableMobileTilt ? "pan-y" : "auto" }}
            >
                <div className="pc-inside">
                    <div className="pc-shine" />
                    <div className="pc-glare" />
                    <div className="pc-content pc-avatar-content">
                        <img
                            className="avatar"
                            src={avatarUrl}
                            alt={`${name || "User"} avatar`}
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target;
                                target.style.display = "none";
                            }}
                        />
                        {showUserInfo && (
                            <div className="pc-user-info">
                                <div className="pc-user-details">
                                    <div className="pc-mini-avatar">
                                        <img
                                            src={miniAvatarUrl || avatarUrl}
                                            alt={`${
                                                name || "User"
                                            } mini avatar`}
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target;
                                                target.style.opacity = "0.5";
                                                target.src = avatarUrl;
                                            }}
                                        />
                                    </div>
                                    <div className="pc-user-text">
                                        <div className="pc-handle">
                                            @{handle}
                                        </div>
                                        <div className="pc-status">
                                            {status}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="pc-contact-btn"
                                    onClick={handleContactClick}
                                    style={{ pointerEvents: "auto" }}
                                    type="button"
                                    aria-label={`Contact ${name || "user"}`}
                                >
                                    {contactText}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="pc-content">
                        <div className="pc-details">
                            <h3>{name}</h3>
                            <p>{title}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
