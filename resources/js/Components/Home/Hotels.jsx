import React from "react";
import "../../../css/hotels.css";
import { Mail, Phone, Star } from "lucide-react";
import ElectricBorder from "../ReactBits/Animations/ElectricBorder";

const PixelTrail = React.lazy(() =>
    import("../ReactBits/Backgrounds/PixelTrail").then((m) => ({
        default: m.default || m,
    }))
);

const hotels = [
    {
        name: "Werrapark Resort Frankenblick Hotel",
        image: "/images/template1.webp",
        email: "info@werrapark-frankenblick.de",
        phone: "036874 205706",
        rating: 4,
    },
    {
        name: "Werrapark Resort Heubacher Höhe Hotel",
        image: "/images/template1.webp",
        email: "info@werrapark-heubacher-höhe.de",
        phone: "036874 93706",
        rating: 3,
    },
    {
        name: "Werrapark Resort Sportcenter",
        image: "/images/template1.webp",
        email: "info@werrapark-sportcenter.de",
        phone: "036874 2280",
        rating: 5,
    },
    {
        name: "Werrapark Resort Sommerberg Hotel",
        image: "/images/template1.webp",
        email: "info@werrapark-sommerberg.de",
        phone: "036870 256109",
        rating: 3,
    },
    {
        name: "Werrapark Resort Ferienhaus-Bungalows",
        image: "/images/template1.webp",
        email: "info@werrapark-ferienhaus.de",
        phone: "036870 256109",
        rating: 4,
    },
];

export default function Hotels() {
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => setIsClient(true), []);

    return (
        <section className="hotels-section relative overflow-hidden">
            {isClient && (
                <React.Suspense fallback={null}>
                    <div
                        className="pixeltrail-bg"
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 1, // arkada ama görünür (içerik zIndex:2)
                            overflow: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <PixelTrail
                            gridSize={50}
                            trailSize={0.1}
                            maxAge={250}
                            interpolate={5}
                            color="#1F8155"
                            gooeyFilter={{
                                id: "custom-goo-filter",
                                strength: 2,
                            }}
                        />
                    </div>
                </React.Suspense>
            )}

            <div className="hotels-container relative z-20">
                <h2 className="hotels-title">Unsere Hotels</h2>

                <div className="hotel-grid">
                    {hotels.map((hotel, index) => (
                        <ElectricBorder
                            key={index}
                            color={"var(--hotel-green)"}
                            secondaryColor={"var(--hotel-green-light)"}
                            borderRadius={16}
                            borderWidth={2}
                            glow={0.28}
                            speed={1.0}
                            hoverIntensity={1.0}
                            className="hotel-eb"
                        >
                            <div className="hotel-card eb-reset">
                                <div className="hotel-image">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="hotel-body">
                                    <h3>{hotel.name}</h3>

                                    <div className="hotel-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={
                                                    i < hotel.rating
                                                        ? "star active"
                                                        : "star"
                                                }
                                            />
                                        ))}
                                    </div>

                                    <div className="hotel-contact">
                                        <a
                                            href={`mailto:${hotel.email}`}
                                            className="hotel-link"
                                        >
                                            <Mail size={16} /> {hotel.email}
                                        </a>
                                        <a
                                            href={`tel:${hotel.phone}`}
                                            className="hotel-link"
                                        >
                                            <Phone size={16} /> {hotel.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ElectricBorder>
                    ))}
                </div>
            </div>
        </section>
    );
}
