import React from "react";
import { Head } from "@inertiajs/react";
import "../../../css/contact.css";

export default function ContactIndex() {
    const execTeam = [
        {
            name: "Sezai Koc",
            role: "Generaldirektor des Werrapark Resorts Hotel",
            email: "sezai.koc@werrapark.de",
            phone: "01702918717",
            avatar: "/images/avatars/sezai.jpg",
        },
        {
            name: "Özgür Akkaynak",
            role: "Operationsmanager des Werrapark Resorts Hotel",
            email: "oezguer.akkaynak@werrapark.de",
            phone: "015159098197",
            avatar: "/images/avatars/ozgur.jpg",
        },
        {
            name: "Christina Pahlahs",
            role: "Leiterin der Personal- und Buchhaltungsabteilung des Werrapark Resorts Hotel",
            email: "christina.pahlahs@werrapark.de",
            phone: "036874 385568",
            avatar: "/images/avatars/christina.jpg",
        },
    ];

    const resTeam = [
        {
            name: "Christian Steinitz",
            role: "Hotelleiter",
            email: "info@werrapark.de",
            phone: "036874 93718",
            phone2: "036874 93788",
            avatar: "/images/avatars/steinitz.jpg",
        },
        {
            name: "Christian Koch",
            role: "Verantwortlich für Buchungen Werrapark Resorts Sommerberg Hotel",
            email: "info@werrapark-sommerberg.de",
            phone: "036870 256109",
            avatar: "/images/avatars/koch.jpg",
        },
        {
            name: "Claudia Rosendahl",
            role: "Verantwortlich für Buchungen Werrapark Resort Heubacher Höhe Hotel",
            email: "empfang-heubach@werrapark.de",
            phone: "036874 93706",
            avatar: "/images/avatars/rosendahl.jpg",
        },
    ];

    const [form, setForm] = React.useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        privacy: false,
    });
    const [sending, setSending] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    const [error, setError] = React.useState("");

    const canSubmit =
        form.name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(form.email) &&
        form.message.trim().length > 5 &&
        form.privacy &&
        !sending;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            setSending(true);
            // Backend'e göndermek istersen:
            // await router.post(route('contact.store'), form);
            // Demo: mailto fallback
            const subject = encodeURIComponent(
                `Kontaktanfrage von ${form.name || "Gast"}`
            );
            const body = encodeURIComponent(
                `Name: ${form.name}\nTelefon: ${form.phone}\nE-Mail: ${form.email}\n\nNachricht:\n${form.message}`
            );
            window.location.href = `mailto:info@werrapark.de?subject=${subject}&body=${body}`;
            setSent(true);
            setError("");
        } catch (err) {
            setError("Etwas ist schiefgelaufen. Bitte erneut versuchen.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="ct-wrap theme-auto">
            <Head title="Kontakt" />
            <div className="ct-bg">
                <div className="ct-gradient ct-gradient-1" />
                <div className="ct-gradient ct-gradient-2" />
                <div className="ct-noise" aria-hidden />
            </div>

            <div className="ct-shell">
                {/* SAYFA BAŞI */}
                <header className="ct-hero">
                    <span className="ct-badge">Werrapark</span>
                    <h1 className="ct-title">Kontakt & Team</h1>
                    <p className="ct-sub">
                        Nehmen Sie Kontakt auf oder sprechen Sie direkt mit
                        unserem Team.
                    </p>
                </header>

                {/* EXEC TEAM */}
                <section className="ct-section">
                    <h2 className="ct-h2">Exekutivteam</h2>
                    <div className="team-grid">
                        {execTeam.map((m, i) => (
                            <article
                                key={i}
                                className="team-card ct-card ct-glass"
                            >
                                <div className="team-top">
                                    <img
                                        className="avatar"
                                        src={m.avatar}
                                        alt={`${m.name} Avatar`}
                                        onError={(e) =>
                                            (e.currentTarget.style.visibility =
                                                "hidden")
                                        }
                                    />
                                    <div className="team-text">
                                        <h3 className="name">{m.name}</h3>
                                        <p className="role">{m.role}</p>
                                    </div>
                                </div>
                                <ul className="contact-list">
                                    <li>
                                        <span className="ico">✉️</span>
                                        <a href={`mailto:${m.email}`}>
                                            {m.email}
                                        </a>
                                    </li>
                                    <li>
                                        <span className="ico">📞</span>
                                        <a href={`tel:${m.phone}`}>{m.phone}</a>
                                    </li>
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* RESERVIERUNGS-TEAM */}
                <section className="ct-section">
                    <h2 className="ct-h2">Reservierungs-Team</h2>
                    <div className="team-grid">
                        {resTeam.map((m, i) => (
                            <article
                                key={i}
                                className="team-card ct-card ct-glass"
                            >
                                <div className="team-top">
                                    <img
                                        className="avatar"
                                        src={m.avatar}
                                        alt={`${m.name} Avatar`}
                                        onError={(e) =>
                                            (e.currentTarget.style.visibility =
                                                "hidden")
                                        }
                                    />
                                    <div className="team-text">
                                        <h3 className="name">{m.name}</h3>
                                        <p className="role">{m.role}</p>
                                    </div>
                                </div>
                                <ul className="contact-list">
                                    <li>
                                        <span className="ico">✉️</span>
                                        <a href={`mailto:${m.email}`}>
                                            {m.email}
                                        </a>
                                    </li>
                                    <li>
                                        <span className="ico">📞</span>
                                        <a href={`tel:${m.phone}`}>{m.phone}</a>
                                    </li>
                                    {m.phone2 && (
                                        <li>
                                            <span className="ico">📞</span>
                                            <a href={`tel:${m.phone2}`}>
                                                {m.phone2}
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* İLETİŞİM BLOKU */}
                <section className="ct-section">
                    <div className="cta-grid">
                        {/* SOL BİLGİ KARTI */}
                        <aside
                            className="info-card ct-card ct-glass"
                            aria-label="Hotel Info"
                        >
                            <h3 className="cta-title">Kontakt aufnehmen</h3>
                            <div className="info-list">
                                <div className="row">
                                    <span className="ico">📍</span>
                                    <span>
                                        Am Kirchberg 15, 98666
                                        Masserberg-Schnett
                                    </span>
                                </div>
                                <a className="row link" href="tel:036874205706">
                                    <span className="ico">📞</span>
                                    <span>036874 205706</span>
                                </a>
                                <a
                                    className="row link"
                                    href="mailto:info@werrapark.de"
                                >
                                    <span className="ico">✉️</span>
                                    <span>info@werrapark.de</span>
                                </a>
                            </div>
                        </aside>

                        {/* SAĞ FORM */}
                        <div className="form-card ct-card ct-glass">
                            {sent ? (
                                <div className="ct-success">
                                    <span className="ico">✅</span>
                                    <div>
                                        <h4>Vielen Dank!</h4>
                                        <p>
                                            Ihre Nachricht wurde vorbereitet.
                                            Wir melden uns zeitnah bei Ihnen.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} noValidate>
                                    {error && (
                                        <div className="ct-error">
                                            <span className="ico">⚠️</span>
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="form-grid">
                                        <div className="field">
                                            <label htmlFor="name">Name*</label>
                                            <input
                                                id="name"
                                                required
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        name: e.target.value,
                                                    }))
                                                }
                                                placeholder="Max Mustermann"
                                                autoComplete="name"
                                            />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="phone">
                                                Telefon
                                            </label>
                                            <input
                                                id="phone"
                                                value={form.phone}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        phone: e.target.value,
                                                    }))
                                                }
                                                placeholder="+49 …"
                                                autoComplete="tel"
                                            />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="email">
                                                E-Mail*
                                            </label>
                                            <input
                                                id="email"
                                                required
                                                type="email"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        email: e.target.value,
                                                    }))
                                                }
                                                placeholder="gast@example.com"
                                                autoComplete="email"
                                            />
                                        </div>
                                        <div className="field field--full">
                                            <label htmlFor="message">
                                                Nachricht*
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={6}
                                                required
                                                value={form.message}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        message: e.target.value,
                                                    }))
                                                }
                                                placeholder="Wie können wir helfen?"
                                            />
                                        </div>
                                        <label className="check field--full">
                                            <input
                                                type="checkbox"
                                                checked={form.privacy}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        privacy:
                                                            e.target.checked,
                                                    }))
                                                }
                                            />
                                            <span>
                                                Ich akzeptiere die{" "}
                                                <a
                                                    href="/impressum"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Datenschutzerklärung
                                                </a>
                                                .
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        className="ct-btn"
                                        disabled={!canSubmit}
                                    >
                                        {sending ? "Senden…" : "Senden"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
