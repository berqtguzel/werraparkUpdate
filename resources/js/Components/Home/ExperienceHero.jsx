import React from "react";
import { FiMail, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import "../../../css/experience-hero.css";
import CountUp from "../ReactBits/Texts/CountUp";
const ExperienceHero = ({
    eyebrow = "Werrapark",
    title = "Urlaub im finnischen Blockhaus",
    description = `
    Ein individuelles Urlaubszuhause in Kombination mit jeder Menge Freizeitofferten.
    Sie bestimmen das Urlaubsprogramm! Die traumhafte Natur, die ungezwungene Verwöhnatmosphäre
    und die zahlreichen Entspannungsangebote im Wellness & Beauty-Resort machen das Genießen
    im „Werrapark“ ganz einfach.
  `,
    years = 24,
    email = "info@werrapark.de",
    image = "/images/blockhaus.jpeg",
}) => {
    return (
        <section className="ex-wrap" aria-label="Über uns – Blockhaus Erlebnis">
            <div className="ex-pattern" aria-hidden="true" />

            <div className="ex-container">
                <figure className="ex-media">
                    <img
                        src={image}
                        alt="Festlich dekorierter Saal – Werrapark"
                        loading="lazy"
                    />
                    <figcaption
                        className="ex-badge"
                        aria-label={`${years} Jahre Erfahrung`}
                    >
                        <span className="ex-badge-num">
                            <CountUp
                                from={0}
                                to={years}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />
                        </span>
                        <span className="ex-badge-sub">Jahre Erfahrung</span>
                    </figcaption>
                </figure>
                <div className="ex-content">
                    <div className="ex-eyebrow">{eyebrow}</div>
                    <h1 className="ex-title">{title}</h1>

                    <p className="ex-desc">{description}</p>

                    <hr className="ex-rule" />

                    <div className="ex-meta">
                        <div className="ex-meta-block">
                            <div className="ex-meta-label">E-Mail</div>
                            <a href={`mailto:${email}`} className="ex-link">
                                <FiMail
                                    className="ex-icon"
                                    aria-hidden="true"
                                />
                                {email}
                            </a>
                        </div>

                        <div className="ex-meta-block">
                            <div className="ex-meta-label">Soziale Medien</div>
                            <div className="ex-social">
                                <a
                                    className="ex-social-btn"
                                    href="https://facebook.com"
                                    aria-label="Facebook"
                                >
                                    <FiFacebook />
                                </a>
                                <a
                                    className="ex-social-btn"
                                    href="https://instagram.com"
                                    aria-label="Instagram"
                                >
                                    <FiInstagram />
                                </a>
                                <a
                                    className="ex-social-btn"
                                    href="https://twitter.com"
                                    aria-label="Twitter X"
                                >
                                    <FiTwitter />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceHero;
