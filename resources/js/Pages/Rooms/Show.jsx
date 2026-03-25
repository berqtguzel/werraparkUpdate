import React from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    BedDouble,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Eye,
    Hash,
    MapPin,
    Maximize,
    Sparkles,
    Users,
} from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { useTranslation } from "@/i18n";
import "@/../css/room-detail.css";

function pickTranslation(translations, locale) {
    if (!Array.isArray(translations)) return null;
    return (
        translations.find(
            (item) =>
                String(item?.language_code ?? item?.locale ?? "").toLowerCase() ===
                String(locale).toLowerCase(),
        ) ?? translations[0] ?? null
    );
}

function normalizeRoom(apiRoom, locale) {
    if (!apiRoom || typeof apiRoom !== "object" || !apiRoom.id) return null;

    const translation = pickTranslation(apiRoom.translations, locale);
    const images = Array.isArray(apiRoom.images)
        ? apiRoom.images
              .map((img) => {
                  if (typeof img === "string") {
                      return { url: img, alt: "" };
                  }

                  return {
                      url: img?.url ?? img?.path ?? null,
                      alt: img?.alt ?? "",
                  };
              })
              .filter((img) => img.url)
        : [];
    const heroImg = apiRoom.image || images[0]?.url || "/images/template2.png";
    const features = Array.isArray(apiRoom.features)
        ? apiRoom.features
              .filter((item) => (item?.status ?? "active") === "active")
              .map((item) => ({
                  id: item?.id ?? item?.name,
                  name: item?.name ?? "",
                  icon: item?.icon ?? null,
              }))
        : [];
    const boardTypes = Array.isArray(apiRoom.board_types)
        ? apiRoom.board_types
              .filter((item) => item?.is_active !== false)
              .map((item) => ({
                  id: item?.id ?? item?.code ?? item?.name,
                  name: item?.name ?? "",
                  code: item?.code ?? "",
                  description: item?.description ?? "",
              }))
        : [];
    const roomPrices = Array.isArray(apiRoom.room_prices) ? apiRoom.room_prices : [];

    return {
        id: apiRoom.id,
        slug: apiRoom.slug ?? String(apiRoom.id),
        name: translation?.name ?? apiRoom.name ?? "",
        description: translation?.description ?? apiRoom.description ?? "",
        roomType: apiRoom.room_type ?? "",
        roomNumber: apiRoom.room_number ?? "",
        capacity: apiRoom.capacity ?? null,
        beds: apiRoom.beds ?? null,
        size: apiRoom.size ?? null,
        viewType: apiRoom.view_type ?? "",
        status: apiRoom.status ?? "",
        heroImage: heroImg,
        gallery: images.length ? images : [{ url: heroImg, alt: "" }],
        features,
        boardTypes,
        roomPrices,
        languages: apiRoom._meta?.available_languages ?? [],
    };
}

export default function RoomShow() {
    const { props } = usePage();
    const { t, locale } = useTranslation();
    const data = React.useMemo(
        () => normalizeRoom(props?.room, locale),
        [props?.room, locale],
    );

    const images = data?.gallery?.length
        ? data.gallery
        : [{ url: "/images/template2.png", alt: "" }];
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

    const quickFacts = data
        ? [
              data.roomType
                  ? {
                        icon: <BedDouble size={16} />,
                        label: t("roomDetail.roomTypeLabel"),
                        value: data.roomType,
                    }
                  : null,
              data.capacity
                  ? {
                        icon: <Users size={16} />,
                        label: t("roomDetail.capacityLabel"),
                        value: t("roomDetail.capacityValue", {
                            count: data.capacity,
                        }),
                    }
                  : null,
              data.beds
                  ? {
                        icon: <BedDouble size={16} />,
                        label: t("roomDetail.bedsLabel"),
                        value: t("roomDetail.bedsValue", { count: data.beds }),
                    }
                  : null,
              data.size
                  ? {
                        icon: <Maximize size={16} />,
                        label: t("roomDetail.sizeLabel"),
                        value: `${data.size} m²`,
                    }
                  : null,
              data.viewType
                  ? {
                        icon: <Eye size={16} />,
                        label: t("roomDetail.viewLabel"),
                        value: data.viewType,
                    }
                  : null,
              data.roomNumber
                  ? {
                        icon: <Hash size={16} />,
                        label: t("roomDetail.roomNumberLabel"),
                        value: data.roomNumber,
                    }
                  : null,
          ].filter(Boolean)
        : [];

    if (!data) {
        return (
            <AppLayout currentRoute="rooms">
                <Head title="Room Not Found" />
                <section
                    className="rux-wrap"
                    style={{ textAlign: "center", padding: "120px 20px" }}
                >
                    <h1>Room not found</h1>
                    <a
                        href={locale === "de" ? "/" : `/${locale}`}
                        className="rux-btn rux-btn--ghost"
                        style={{ marginTop: 20 }}
                    >
                        {t("roomDetail.homeBtn")}
                    </a>
                </section>
            </AppLayout>
        );
    }

    return (
        <AppLayout currentRoute="rooms">
            <Head title={t("roomDetail.pageTitle", { name: data.name })} />

            <section className="rux-wrap" aria-labelledby="rux-title">
                <div className="rux-grid">
                    <article className="rux-stage-card">
                        <figure
                            className="rux-stage"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <img
                                src={activeImage.url}
                                alt={activeImage.alt || data.name}
                            />
                            <div className="rux-overlay" />

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
                            {images.map((image, index) => (
                                <button
                                    key={`${image.url}-${index}`}
                                    type="button"
                                    className={`rux-thumb ${index === activeIndex ? "is-active" : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={t("roomDetail.imageN", {
                                        n: index + 1,
                                    })}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt || ""}
                                        aria-hidden="true"
                                    />
                                </button>
                            ))}
                        </div>
                    </article>

                    <aside className="rux-aside">
                        <p className="rux-eyebrow">{t("roomDetail.eyebrow")}</p>
                        <h1 id="rux-title" className="rux-title">
                            {data.name}
                        </h1>

                        {data.viewType ? (
                            <p className="rux-loc">
                                <MapPin size={15} />
                                <span>{data.viewType}</span>
                            </p>
                        ) : null}

                        <p className="rux-intro">{data.description}</p>

                        {quickFacts.length > 0 && (
                            <div className="rux-facts rux-facts--grid">
                                {quickFacts.map((fact, i) => (
                                    <article key={i} className="rux-fact">
                                        <div className="rux-fact__label">
                                            {fact.icon}
                                            <span>{fact.label}</span>
                                        </div>
                                        <strong>{fact.value}</strong>
                                    </article>
                                ))}
                            </div>
                        )}

                        <article className="rux-cta">
                            <p className="rux-kicker">
                                {t("roomDetail.idealFor")}
                            </p>
                            <h2>
                                {[data.roomType, data.viewType]
                                    .filter(Boolean)
                                    .join(" · ") || data.name}
                            </h2>
                            <p>{t("roomDetail.bookingText")}</p>
                            <div className="rux-actions">
                                <a
                                    href={`/${locale}/kontakt`}
                                    className="rux-btn rux-btn--primary"
                                >
                                    {t("roomDetail.requestBtn")}
                                </a>
                                <a
                                    href={locale === "de" ? "/" : `/${locale}`}
                                    className="rux-btn rux-btn--ghost"
                                >
                                    {t("roomDetail.homeBtn")}
                                </a>
                            </div>
                        </article>
                    </aside>
                </div>

                <div className="rux-bottom">
                    {data.boardTypes.length > 0 && (
                        <article className="rux-panel">
                            <div className="rux-panel-head">
                                <BedDouble size={17} />
                                <h3>{t("roomDetail.roomCategories")}</h3>
                            </div>
                            <ul className="rux-list">
                                {data.boardTypes.map((item) => (
                                    <li key={item.id}>
                                        <CheckCircle2 size={16} />
                                        <span>
                                            {[item.name, item.code, item.description]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    )}

                    {data.features.length > 0 && (
                        <article className="rux-panel rux-panel--amenities">
                            <div className="rux-panel-head">
                                <Sparkles size={17} />
                                <h3>{t("roomDetail.amenities")}</h3>
                            </div>
                            <div className="rux-chip-grid">
                                {data.features.map((item) => (
                                    <span className="rux-chip" key={item.id}>
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </article>
                    )}

                    <article className="rux-panel">
                        <div className="rux-panel-head">
                            <CreditCard size={17} />
                            <h3>{t("roomDetail.priceTitle")}</h3>
                        </div>
                        {data.roomPrices.length > 0 ? (
                            <ul className="rux-list">
                                {data.roomPrices.map((item, i) => (
                                    <li key={item.id ?? i}>
                                        <CheckCircle2 size={16} />
                                        <span>
                                            {[
                                                item.name,
                                                item.season,
                                                item.price != null
                                                    ? `${item.price} €`
                                                    : null,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rux-note rux-note--plain">
                                <CheckCircle2 size={16} />
                                <p>{t("roomDetail.priceFallback")}</p>
                            </div>
                        )}
                    </article>
                </div>
            </section>
        </AppLayout>
    );
}
