import React from "react";
import "../../../css/contact.css";

const MailIcon = (props) => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        {...props}
    >
        <path
            fill="currentColor"
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 11 4 6.01V6h16ZM4 18V8.24l7.4 4.94a1.5 1.5 0 0 0 1.2 0L20 8.24V18H4Z"
        />
    </svg>
);
const PhoneIcon = (props) => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        {...props}
    >
        <path
            fill="currentColor"
            d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a2 2 0 0 1-2 2C9.7 22 2 14.3 2 4a2 2 0 0 1 2-2h3.5a1 1 0 0 1 1 1c0 1.3.19 2.5.55 3.6a1 1 0 0 1-.25 1L6.6 10.8Z"
        />
    </svg>
);
const PinIcon = (props) => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        {...props}
    >
        <path
            fill="currentColor"
            d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        />
    </svg>
);

function TeamCard({ photo, name, title, email, phone }) {
    return (
        <article
            className="ct-card"
            role="group"
            aria-label={`${name} – ${title}`}
        >
            <div className="ct-card__header">
                <img
                    src={photo}
                    alt={`${name} fotoğrafı`}
                    className="ct-card__avatar"
                />
                <div className="ct-card__titles">
                    <h3 className="ct-card__name">{name}</h3>
                    <p className="ct-card__role">{title}</p>
                </div>
            </div>
            <ul className="ct-card__meta">
                {email && (
                    <li>
                        <MailIcon />
                        <a href={`mailto:${email}`}>{email}</a>
                    </li>
                )}
                {phone && (
                    <li>
                        <PhoneIcon />
                        <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                    </li>
                )}
            </ul>
        </article>
    );
}

export default function ContactPage() {
    const executives = [
        {
            photo: "/images/team/sezai.jpg",
            name: "Sezai Koc",
            title: "Generaldirektor des Werrapark Resorts Hotel",
            email: "sezai.koc@werrapark.de",
            phone: "0170 291 8717",
        },
        {
            photo: "/images/team/ozgur.jpg",
            name: "Özgür Akkaynak",
            title: "Operationsmanager des Werrapark Resorts Hotel",
            email: "ozgur.akkaynak@werrapark.de",
            phone: "0151 5909 8197",
        },
        {
            photo: "/images/team/christina.jpg",
            name: "Christina Pahlahs",
            title: "Leiterin der Personal- und Buchhaltungsabteilung des Werrapark Resorts Hotel",
            email: "christina.pahlahs@werrapark.de",
            phone: "03684 385 568",
        },
    ];

    const reservations = [
        {
            photo: "/images/team/steinitz.jpg",
            name: "Christian Steinitz",
            title: "Hotelleiter",
            email: "info@werrapark.de",
            phone: "03684 93718",
        },
        {
            photo: "/images/team/koch.jpg",
            name: "Christian Koch",
            title: "Verantwortlich für Buchungen – Werrapark Resorts Sommerberg Hotel",
            email: "info@werrapark-sommerberg.de",
            phone: "036870 256109",
        },
        {
            photo: "/images/team/rossendahl.jpg",
            name: "Claudia Rosendahl",
            title: "Verantwortlich für Buchungen – Werrapark Resort Heubacher Höhe Hotel",
            email: "empfang-heubach@werrapark.de",
            phone: "036874 93706",
        },
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        alert("Danke! Ihre Nachricht wurde lokal validiert. (Back-end bağla)");
    };

    return (
        <main className="ct-section" id="kontakt">
            <div className="ct-container">
                <header className="ct-header">
                    <h1 className="ct-title">Kontakt</h1>
                    <p className="ct-subtitle">
                        Bize dilediğiniz kanaldan ulaşabilirsiniz. Yönetim ve
                        rezervasyon ekiplerinin iletişim bilgileri aşağıdadır.
                    </p>
                </header>

                <section aria-labelledby="exec-title" className="ct-block">
                    <h2 id="exec-title" className="ct-block__title">
                        Exekutivteam
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
                        Reservierungs-Team
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
                            Kontakt aufnehmen
                        </h2>
                        <ul className="ct-info">
                            <li>
                                <PinIcon />
                                <span>
                                    Am Kirchberg 15, 98666 Masserberg-Schnett
                                </span>
                            </li>
                            <li>
                                <PhoneIcon />
                                <a href="tel:+493684205706">03684 205706</a>
                            </li>
                            <li>
                                <MailIcon />
                                <a href="mailto:info@werrapark.de">
                                    info@werrapark.de
                                </a>
                            </li>
                        </ul>
                    </div>

                    <form className="ct-form" onSubmit={onSubmit} noValidate>
                        <div className="ct-field">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Adınız"
                                required
                            />
                        </div>

                        <div className="ct-field">
                            <label htmlFor="phone">Telefon</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+49 …"
                            />
                        </div>

                        <div className="ct-field">
                            <label htmlFor="email">E-Mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ornek@mail.com"
                                required
                            />
                        </div>

                        <div className="ct-field ct-field--full">
                            <label htmlFor="message">Nachricht</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder="Mesajınız"
                                required
                            />
                        </div>

                        <div className="ct-actions">
                            <button type="submit" className="ct-button">
                                Senden
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
