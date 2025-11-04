import React from "react";
import { Link } from "@inertiajs/react";
import "./ServiceCard.css";

const ServiceCard = ({ title, description, image, link, icon: Icon }) => {
    const imageRef = React.useRef(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <div className="service-card group">
            <div className="service-card__image-wrapper">
                {!isLoaded && (
                    <div className="service-card__skeleton" aria-hidden="true">
                        <div className="service-card__skeleton-wave"></div>
                    </div>
                )}
                <img
                    ref={imageRef}
                    src={image}
                    alt={title}
                    className={`service-card__image ${
                        isLoaded ? "is-loaded" : ""
                    }`}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    width="800"
                    height="600"
                />
                <div className="service-card__overlay">
                    {Icon && <Icon className="service-card__icon" />}
                </div>
            </div>

            <div className="service-card__content">
                <h3 className="service-card__title">{title}</h3>

                <Link
                    href={link}
                    className="service-card__button"
                    aria-label={`Mehr über ${title} erfahren`}
                >
                    <span>Details</span>
                    <svg
                        className="service-card__arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
