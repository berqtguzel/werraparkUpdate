import React from "react";
import { usePage } from "@inertiajs/react";
import { FiMail, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import "../../../css/experience-hero.css";
import CountUp from "../ReactBits/Texts/CountUp";

const ExperienceHero = () => {
    const { props } = usePage();

    const data = props?.global?.widgets?.serviceHighlights || {};
    const settingsContact = props?.global?.settings?.contact || {};
    const settingsSocial = props?.global?.settings?.social || {};
    const locale = props?.locale || "de";

    const item = Array.isArray(data) ? data[0] : data;

    const translation =
        item?.translations?.find((t) => t.language_code === locale) ||
        item?.translations?.[0] ||
        {};

    const title = translation.name || item?.name || "";
    const description = translation.description || item?.description || "";
    const image = item?.image || "";
    const years = item?.years || 25;
    const email =
        settingsContact?.email || settingsContact?.reservation_email || "";
    const badgeLabel =
        locale === "tr"
            ? "Deneyim"
            : locale === "en"
              ? "Experience"
              : "Erfahrung";
    const badgeCaption =
        locale === "tr"
            ? "Konaklama ve misafir deneyimi"
            : locale === "en"
              ? "Hospitality and guest experience"
              : "Gastfreundschaft mit echter Erfahrung";
    const badgeUnit =
        locale === "tr" ? "Yil" : locale === "en" ? "Years" : "Jahre";

    const socialLinks = [
        { key: "facebook", url: settingsSocial?.facebook_url },
        { key: "instagram", url: settingsSocial?.instagram_url },
        { key: "twitter", url: settingsSocial?.twitter_url },
    ].filter((link) => link.url);

    return (
        <section className="ex-wrap">
            <div className="ex-pattern" />

            <div className="ex-container">
                <figure className="ex-media">
                    {image && <img src={image} alt={title} loading="lazy" />}

                    <figcaption className="ex-badge">
                        <span className="ex-badge-label">{badgeLabel}</span>
                        <div className="ex-badge-main">
                            <span className="ex-badge-num">
                                <CountUp
                                    className="ex-count-up"
                                    from={0}
                                    to={Number(years)}
                                    duration={1.4}
                                />
                            </span>
                            <span className="ex-badge-unit">{badgeUnit}</span>
                        </div>
                        <span className="ex-badge-divider" aria-hidden="true" />
                        <span className="ex-badge-caption">{badgeCaption}</span>
                    </figcaption>
                </figure>

                <div className="ex-content">
                    <div className="eyebrow">Werrapark</div>

                    <h1 className="ex-title">{title}</h1>

                    <div
                        className="ex-desc"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

                    <hr className="ex-rule" />

                    <div className="ex-meta">
                        {email && (
                            <div className="ex-meta-block">
                                <div className="ex-meta-label">E-Mail</div>
                                <a href={`mailto:${email}`} className="ex-link">
                                    <FiMail className="ex-icon" />
                                    {email}
                                </a>
                            </div>
                        )}

                        {socialLinks.length > 0 && (
                            <div className="ex-meta-block">
                                <div className="ex-meta-label">
                                    Soziale Medien
                                </div>
                                <div className="ex-social">
                                    {socialLinks.map((entry) => {
                                        const Icon =
                                            entry.key === "facebook"
                                                ? FiFacebook
                                                : entry.key === "instagram"
                                                  ? FiInstagram
                                                  : FiTwitter;

                                        return (
                                            <a
                                                key={entry.key}
                                                className="ex-social-btn"
                                                href={entry.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Icon />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceHero;
