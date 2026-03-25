"use client";

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FiCheck,
    FiUsers,
    FiCreditCard,
    FiChevronRight,
    FiLayers,
} from "react-icons/fi";
import "../../../css/rooms-showcase.css";
import { useTranslation } from "@/i18n";

const DotGrid = React.lazy(() =>
    import("../ReactBits/Backgrounds/DotGrid").then((m) => ({
        default: m.default || m,
    })),
);

const Title = ({ children }) => <h1 className="rs-title">{children}</h1>;
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

const HotelCard = ({ hotel, locale }) => {
    const { t } = useTranslation();
    const href = `/${locale}/rooms/${hotel.slug ?? hotel.id}`;
    const boardSummary = (hotel.boardTypes || [])
        .map((item) => item?.description ?? item?.name ?? item?.code)
        .filter(Boolean)
        .slice(0, 2);
    const featureSummary = (hotel.features || [])
        .map((item) => item?.name)
        .filter(Boolean)
        .slice(0, 3);
    const roomFacts = [
        hotel.capacity
            ? {
                  icon: <FiUsers className="rs-icon" aria-hidden />,
                  label: t("rooms.capacityLabel"),
                  value: t("rooms.capacityValue", { count: hotel.capacity }),
              }
            : null,
        boardSummary.length
            ? {
                  icon: <FiLayers className="rs-icon" aria-hidden />,
                  label: t("rooms.boardTypesLabel"),
                  value: boardSummary.join(" · "),
              }
            : null,
        hotel.price
            ? {
                  icon: <FiCreditCard className="rs-icon" aria-hidden />,
                  label: t("rooms.priceLabel"),
                  value: hotel.price,
              }
            : null,
    ].filter(Boolean);

    return (
        <article className="rs-card" aria-labelledby={`h-${hotel.id}`}>
            {hotel.image && (
                <div className="rs-card__media-wrap">
                    <img
                        className="rs-card__media"
                        src={hotel.image}
                        alt={hotel.name}
                    />
                </div>
            )}

            <div className="rs-card__body">
                <div className="rs-card__head">
                    <h3 id={`h-${hotel.id}`} className="rs-card__title">
                        {hotel.name}
                    </h3>
                    {hotel.description ? (
                        <p className="rs-card__desc">{hotel.description}</p>
                    ) : null}
                </div>

                {roomFacts.length ? (
                    <div className="rs-facts">
                        {roomFacts.map((fact, i) => (
                            <div className="rs-fact" key={i}>
                                <span className="rs-fact__icon">
                                    {fact.icon}
                                </span>
                                <div className="rs-fact__copy">
                                    <span className="rs-fact__label">
                                        {fact.label}
                                    </span>
                                    <strong>{fact.value}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

                {featureSummary.length ? (
                    <div className="rs-tags">
                        {featureSummary.map((item, i) => (
                            <span className="rs-tag" key={i}>
                                <FiCheck className="rs-icon" aria-hidden />
                                {item}
                            </span>
                        ))}
                    </div>
                ) : null}

                {hotel.items?.length ? (
                    <ul className="rs-list">
                        {hotel.items.slice(0, 4).map((item, i) => (
                            <li key={i}>
                                <FiCheck className="rs-icon" aria-hidden />
                                <span>
                                    {typeof item === "string"
                                        ? item
                                        : (item.name ?? item.label)}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : null}

                <Link className="rs-cta" href={href}>
                    {t("rooms.explore")}
                    <FiChevronRight />
                </Link>
            </div>
        </article>
    );
};

export default function RoomsShowcase() {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const { props } = usePage();
    const hotels = Array.isArray(props?.rooms) ? props.rooms : [];
    const { t, locale } = useTranslation();

    return (
        <section className="rs-wrap rs-with-bg" aria-labelledby="rooms-title">
            {mounted && (
                <React.Suspense fallback={null}>
                    <div
                        className="rs-dotgrid"
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            overflow: "hidden",
                        }}
                    >
                        <DotGrid
                            dotSize={12}
                            gap={80}
                            baseColor="#1f7008"
                            activeColor="#0E9B5B"
                            proximity={150}
                            speedTrigger={110}
                            shockRadius={260}
                            shockStrength={5}
                            maxSpeed={5200}
                            resistance={820}
                            returnDuration={1.3}
                        />
                    </div>
                </React.Suspense>
            )}

            <div className="rs-top">
                <Eyebrow>{t("rooms.eyebrow")}</Eyebrow>
                <Title id="rooms-title">{t("rooms.title")}</Title>
                <p className="rs-intro">{t("rooms.intro")}</p>
            </div>

            <div className="rs-grid">
                {hotels.length ? (
                    hotels.map((h) => (
                        <HotelCard
                            key={h.id ?? h.slug}
                            hotel={h}
                            locale={locale}
                        />
                    ))
                ) : (
                    <article className="rs-card rs-card--empty">
                        <div className="rs-card__head">
                            <h3 className="rs-card__title">
                                {t("rooms.emptyTitle")}
                            </h3>
                            <p className="rs-card__desc">
                                {t("rooms.emptyText")}
                            </p>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
