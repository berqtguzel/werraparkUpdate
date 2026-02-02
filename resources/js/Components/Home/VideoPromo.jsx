import React from "react";
import "../../../css/video-promo.css";

export default function VideoPromo({
    title = "Schauen Sie sich unser Werbevideo an",
    poster = "/public/images/Thumbnail2.webp",
    videoId = "dQw4w9WgXcQ",
    alt = "Werbevideo Vorschaubild",
}) {
    const [playing, setPlaying] = React.useState(false);

    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hl=de`;

    return (
        <section className="vp-section">
            <div className="vp-shell">
                <h2 className="vp-title">{title}</h2>

                <div className="vp-aspect">
                    {playing ? (
                        <iframe
                            className="vp-iframe"
                            src={src}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    ) : (
                        <button
                            type="button"
                            className="vp-poster"
                            onClick={() => setPlaying(true)}
                            aria-label="Video abspielen"
                        >
                            <img className="vp-img" src={poster} alt={alt} />
                            <span className="vp-play" aria-hidden="true">
                                <svg viewBox="0 0 64 64" width="64" height="64">
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="30"
                                        fill="rgba(34,197,94,.9)"
                                    />
                                    <polygon
                                        points="26,20 48,32 26,44"
                                        fill="#fff"
                                    />
                                </svg>
                            </span>
                            <span className="vp-cta">
                                Schauen Sie sich unser Werbevideo an
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
