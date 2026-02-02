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
        <section
            className="hotels-section relative overflow-hidden"
            aria-labelledby="hotels-heading"
        >
            <div className="hotels-container relative z-20">
                <h2 id="hotels-heading" className="hotels-title">
                    Unsere Hotels
                </h2>
                <p className="hotels-subtitle" role="doc-subtitle">
                    Entdecken Sie unsere Häuser im Thüringer Wald – komfortabel,
                    naturverbunden und mit herzlicher Gastfreundschaft.
                </p>

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
                            <div
                                className="hotel-card eb-reset"
                                role="article"
                                aria-label={hotel.name}
                            >
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
                                                aria-hidden
                                            />
                                        ))}
                                    </div>

                                    <div className="hotel-contact">
                                        <a
                                            href={`mailto:${hotel.email}`}
                                            className="hotel-link"
                                            aria-label={`E-Mail senden an ${hotel.name}`}
                                        >
                                            <Mail size={16} /> {hotel.email}
                                        </a>
                                        <a
                                            href={`tel:${hotel.phone}`}
                                            className="hotel-link"
                                            aria-label={`Telefonnummer von ${hotel.name} anrufen`}
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
