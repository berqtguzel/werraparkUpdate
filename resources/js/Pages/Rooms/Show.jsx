import React from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    BedDouble,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Sparkles,
} from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import ROOMS_DATA, { ROOM_LIST } from "@/Data/RoomsData";
import { useTranslation } from "@/i18n";
import "@/../css/room-detail.css";

function normalizeRoom(apiRoom) {
    if (!apiRoom || typeof apiRoom !== "object" || !apiRoom.id) return null;

    const images = apiRoom.images?.length
        ? apiRoom.images.map((img) => (typeof img === "string" ? img : img.url ?? img.path))
        : [];
    const heroImg = apiRoom.image || images[0] || "/images/template2.png";

    const features = (apiRoom.features ?? []).map((f) =>
        typeof f === "string" ? f : f.name ?? f.label ?? String(f),
    );

    const boardTypes = (apiRoom.board_prices ?? apiRoom.board_types ?? []).map(
        (b) => `${b.board_type_name ?? b.name} – ${b.price}€`,
    );

    const quickFacts = [
        { label: "Typ", value: apiRoom.room_type ?? "" },
        { label: "Kapazität", value: `${apiRoom.capacity ?? "–"} Pers.` },
        { label: "Betten", value: String(apiRoom.beds ?? "–") },
        { label: "Größe", value: apiRoom.size ? `${apiRoom.size} m²` : "–" },
    ].filter((f) => f.value && f.value !== "–");

    return {
        id: apiRoom.slug ?? String(apiRoom.id),
        hotelName: apiRoom.name ?? "",
        location: apiRoom.view_type ?? "",
        heroImage: heroImg,
        gallery: images.length ? images : [heroImg],
        intro: apiRoom.description ?? "",
        atmosphere: "",
        roomTypes: boardTypes.length ? boardTypes : [apiRoom.room_type].filter(Boolean),
        amenities: features,
        goodFor: apiRoom.view_type ? `${apiRoom.room_type}, ${apiRoom.view_type}` : apiRoom.room_type ?? "",
        quickFacts,
        roomPrices: apiRoom.room_prices ?? [],
        translations: apiRoom.translations ?? [],
        status: apiRoom.status ?? "",
        roomNumber: apiRoom.room_number ?? "",
    };
}

function resolveData(props) {
    const { room: apiRoom, roomSlug } = props;

    const normalized = normalizeRoom(apiRoom);
    if (normalized) return normalized;

    const slug = roomSlug ?? props.room;

    if (typeof slug === "string" && ROOMS_DATA[slug]) return ROOMS_DATA[slug];

    if (typeof slug === "string" && /^\d+$/.test(slug)) {
        const idx = parseInt(slug, 10) - 1;
        if (ROOM_LIST[idx]) return ROOM_LIST[idx];
    }

    if (typeof slug === "string") {
        const lc = slug.toLowerCase();
        const match = ROOM_LIST.find(
            (r) => r.id.includes(lc) || r.hotelName.toLowerCase().includes(lc),
        );
        if (match) return match;
    }

    return ROOM_LIST[0] ?? null;
}

export default function RoomShow() {
    const { props } = usePage();
    const { t, locale } = useTranslation();
    const data = resolveData(props);

    const images = data?.gallery?.length ? data.gallery : data?.heroImage ? [data.heroImage] : ["/images/template2.png"];
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);
    const activeImage = images[activeIndex] ?? images[0];

    React.useEffect(() => {
        setActiveIndex(0);
    }, [data?.id]);

    React.useEffect(() => {
        if (paused || images.length <= 1) return;
        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 4200);
        return () => window.clearInterval(interval);
    }, [images.length, paused, data?.id]);

    const goPrev = () =>
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);

    if (!data) {
        return (
            <AppLayout currentRoute="rooms">
                <Head title="Room Not Found" />
                <section className="rux-wrap" style={{ textAlign: "center", padding: "120px 20px" }}>
                    <h1>Room not found</h1>
                    <a href={locale === "de" ? "/" : `/${locale}`} className="rux-btn rux-btn--ghost" style={{ marginTop: 20 }}>
                        {t("roomDetail.homeBtn")}
                    </a>
                </section>
            </AppLayout>
        );
    }

    return (
        <AppLayout currentRoute="rooms">
            <Head title={t("roomDetail.pageTitle", { name: data.hotelName })} />

            <section className="rux-wrap" aria-labelledby="rux-title">
                <div className="rux-grid">
                    <article className="rux-stage-card">
                        <figure
                            className="rux-stage"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <img src={activeImage} alt={data.hotelName} />
                            <div className="rux-overlay" />
                            {data.atmosphere && (
                                <figcaption className="rux-caption">
                                    {data.atmosphere}
                                </figcaption>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        className="rux-arrow rux-arrow--left"
                                        onClick={goPrev}
                                        aria-label={t("roomDetail.prevImage")}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        className="rux-arrow rux-arrow--right"
                                        onClick={goNext}
                                        aria-label={t("roomDetail.nextImage")}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </figure>

                        <div className="rux-thumbs">
                            {images.map((src, index) => (
                                <button
                                    key={`${src}-${index}`}
                                    type="button"
                                    className={`rux-thumb ${index === activeIndex ? "is-active" : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={t("roomDetail.imageN", { n: index + 1 })}
                                >
                                    <img src={src} alt="" aria-hidden="true" />
                                </button>
                            ))}
                        </div>
                    </article>

                    <aside className="rux-aside">
                        <p className="rux-eyebrow">{t("roomDetail.eyebrow")}</p>
                        <h1 id="rux-title" className="rux-title">
                            {data.hotelName}
                        </h1>
                        <p className="rux-loc">
                            <MapPin size={15} />
                            <span>{data.location}</span>
                        </p>
                        <p className="rux-intro">{data.intro}</p>

                        {data.quickFacts?.length > 0 && (
                            <div className="rux-facts">
                                {data.quickFacts.map((fact, i) => (
                                    <article key={i} className="rux-fact">
                                        <span>{fact.label}</span>
                                        <strong>{fact.value}</strong>
                                    </article>
                                ))}
                            </div>
                        )}

                        <article className="rux-cta">
                            {data.goodFor && (
                                <>
                                    <p className="rux-kicker">{t("roomDetail.idealFor")}</p>
                                    <h2>{data.goodFor}</h2>
                                </>
                            )}
                            <p>{t("roomDetail.bookingText")}</p>
                            <div className="rux-actions">
                                <a
                                    href={`/${locale}/kontakt`}
                                    className="rux-btn rux-btn--primary"
                                >
                                    {t("roomDetail.requestBtn")}
                                </a>
                                <a href={locale === "de" ? "/" : `/${locale}`} className="rux-btn rux-btn--ghost">
                                    {t("roomDetail.homeBtn")}
                                </a>
                            </div>
                        </article>
                    </aside>
                </div>

                <div className="rux-bottom">
                    {data.roomTypes?.length > 0 && (
                        <article className="rux-panel">
                            <div className="rux-panel-head">
                                <BedDouble size={17} />
                                <h3>{t("roomDetail.roomCategories")}</h3>
                            </div>
                            <ul className="rux-list">
                                {data.roomTypes.map((item, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={16} />
                                        <span>{typeof item === "string" ? item : item.name ?? item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    )}

                    {data.amenities?.length > 0 && (
                        <article className="rux-panel rux-panel--amenities">
                            <div className="rux-panel-head">
                                <Sparkles size={17} />
                                <h3>{t("roomDetail.amenities")}</h3>
                            </div>
                            <div className="rux-chip-grid">
                                {data.amenities.map((item, i) => (
                                    <span className="rux-chip" key={i}>
                                        {typeof item === "string" ? item : item.name ?? item.label}
                                    </span>
                                ))}
                            </div>
                        </article>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
