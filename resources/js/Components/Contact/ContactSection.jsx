import React from "react";
import { usePage } from "@inertiajs/react";
import "../../../css/contact.css";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n";

function TeamCard({ photo, name, title, email, phone }) {
    return (
        <article className="ct-card">
            <div className="ct-card__header">
                <img src={photo} alt={name} className="ct-card__avatar" />

                <div className="ct-card__titles">
                    <h3 className="ct-card__name">{name}</h3>
                    <p className="ct-card__role">{title}</p>
                </div>
            </div>

            <div className="ct-card__meta">
                {email && (
                    <a className="ct-meta-row" href={`mailto:${email}`}>
                        <Mail size={16} />
                        <span>{email}</span>
                    </a>
                )}

                {phone && (
                    <a
                        className="ct-meta-row"
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                    >
                        <Phone size={16} />
                        <span>{phone}</span>
                    </a>
                )}
            </div>
        </article>
    );
}
const FALLBACK_EXECUTIVES = [
    { photo: "/images/teams/sezaikoc.png", name: "Sezai Koc", title: "Generaldirektor des Werrapark Resorts Hotel", email: "sezai.koc@werrapark.de", phone: "0170 291 8717" },
    { photo: "/images/teams/sezaikoc.png", name: "Özgür Akkaynak", title: "Operationsmanager des Werrapark Resorts Hotel", email: "ozgur.akkaynak@werrapark.de", phone: "0151 5909 8197" },
    { photo: "/images/teams/sezaikoc.png", name: "Christina Pahlahs", title: "Leiterin der Personal- und Buchhaltungsabteilung des Werrapark Resorts Hotel", email: "christina.pahlahs@werrapark.de", phone: "03684 385 568" },
];

const FALLBACK_RESERVATIONS = [
    { photo: "/images/teams/sezaikoc.png", name: "Christian Steinitz", title: "Hotelleiter", email: "info@werrapark.de", phone: "03684 93718" },
    { photo: "/images/teams/sezaikoc.png", name: "Christian Koch", title: "Verantwortlich für Buchungen – Werrapark Resorts Sommerberg Hotel", email: "info@werrapark-sommerberg.de", phone: "036870 256109" },
    { photo: "/images/teams/sezaikoc.png", name: "Claudia Rosendahl", title: "Verantwortlich für Buchungen – Werrapark Resort Heubacher Höhe Hotel", email: "empfang-heubach@werrapark.de", phone: "036874 93706" },
];

export default function ContactPage() {
    const { t } = useTranslation();
    const { props } = usePage();
    const contactForms = props?.global?.contactForms ?? {};
    const settingsContact = props?.global?.settings?.contact ?? {};

    const executives = (contactForms.executives?.length ? contactForms.executives : FALLBACK_EXECUTIVES).map((p) => ({
        photo: p.photo || "/images/teams/sezaikoc.png",
        name: p.name,
        title: p.title,
        email: p.email,
        phone: p.phone,
    }));

    const reservations = (contactForms.reservations?.length ? contactForms.reservations : FALLBACK_RESERVATIONS).map((p) => ({
        photo: p.photo || "/images/teams/sezaikoc.png",
        name: p.name,
        title: p.title,
        email: p.email,
        phone: p.phone,
    }));

    const addressStr = contactForms.contactInfo?.address
        || (typeof settingsContact.address === "string" ? settingsContact.address : null)
        || (settingsContact.street || settingsContact.address_line
            ? [settingsContact.street ?? settingsContact.address_line, settingsContact.city, settingsContact.country].filter(Boolean).join(", ")
            : null)
        || "Am Kirchberg 15, 98666 Masserberg-Schnett";

    const contactInfo = {
        address: addressStr,
        phone: contactForms.contactInfo?.phone || settingsContact.phone || settingsContact.tel || settingsContact.mobile || "+493684205706",
        email: contactForms.contactInfo?.email || settingsContact.email || settingsContact.mail || "info@werrapark.de",
        map: settingsContact.map || null,
    };

    const onSubmit = (e) => {
        e.preventDefault();
        alert(t("contact.success"));
    };

    return (
        <main className="ct-section" id="kontakt">
            <div className="ct-container">
                <header className="ct-header">
                    <h1 className="ct-title">{t("contact.title")}</h1>
                    <p className="ct-subtitle">
                        {t("contact.subtitle")}
                    </p>
                </header>

                <section aria-labelledby="exec-title" className="ct-block">
                    <h2 id="exec-title" className="ct-block__title">
                        {t("contact.executives")}
                    </h2>
                    <div className="ct-grid">
                        {executives.map((p) => (
                            <TeamCard key={p.email} {...p} />
                        ))}
                    </div>
                </section>

                {/* Reservations team */}
                <section aria-labelledby="res-title" className="ct-block">
                    <h2 id="res-title" className="ct-block__title">
                        {t("contact.reservations")}
                    </h2>
                    <div className="ct-grid">
                        {reservations.map((p) => (
                            <TeamCard key={p.email} {...p} />
                        ))}
                    </div>
                </section>

                {/* Contact panel + form */}
                <section aria-labelledby="form-title" className="ct-panel">
                    <div className="ct-panel__info">
                        <h2 id="form-title" className="ct-panel__title">
                            {t("contact.formTitle")}
                        </h2>
                        <ul className="ct-info">
                            <li>
                                <MapPin size={18} />
                                <span>{contactInfo.address}</span>
                            </li>

                            <li>
                                <Phone size={18} />
                                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</a>
                            </li>

                            <li>
                                <Mail size={18} />
                                <a href={`mailto:${contactInfo.email}`}>
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>

                        {contactInfo.map ? (
                            <a
                                href={contactInfo.map}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ct-map-placeholder ct-map-placeholder--link"
                                aria-label={t("contact.mapLabel")}
                            >
                                <div className="ct-map-inner">
                                    <span className="ct-map-badge">{t("contact.mapBadge")}</span>
                                    <p className="ct-map-text">{t("contact.mapText")}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="ct-map-placeholder" aria-label={t("contact.mapLabel")}>
                                <div className="ct-map-inner">
                                    <span className="ct-map-badge">{t("contact.mapBadge")}</span>
                                    <p className="ct-map-text">{t("contact.mapText")}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="ct-form" onSubmit={onSubmit} noValidate>
                        <div className="ct-field">
                            <label htmlFor="name">{t("contact.name")}</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder={t("contact.namePlaceholder")}
                                required
                            />
                        </div>

                        <div className="ct-field">
                            <label htmlFor="phone">{t("contact.phone")}</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+49 …"
                            />
                        </div>

                        <div className="ct-field">
                            <label htmlFor="email">{t("contact.email")}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t("contact.emailPlaceholder")}
                                required
                            />
                        </div>

                        <div className="ct-field ct-field--full">
                            <label htmlFor="message">{t("contact.message")}</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder={t("contact.messagePlaceholder")}
                                required
                            />
                        </div>

                        <div className="ct-actions">
                            <button type="submit" className="ct-button">
                                {t("contact.send")}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
