import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import "@/../css/gift-voucher-page.css";

export default function GiftVoucherPage({ currentRoute = "gutschein" }) {
    const presetAmounts = [100, 200, 300, 400, 500];
    const [selectedAmount, setSelectedAmount] = React.useState(100);
    const [useCustom, setUseCustom] = React.useState(false);
    const [customAmount, setCustomAmount] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);
    const [recipientName, setRecipientName] = React.useState("");
    const [recipientEmail, setRecipientEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const parsedCustom = Number(customAmount);
    const customValue = Number.isFinite(parsedCustom)
        ? Math.min(500, Math.max(10, parsedCustom))
        : 0;
    const amount = useCustom ? customValue || 10 : selectedAmount;
    const total = amount * Math.max(1, quantity);

    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Geschenkgutschein" />
            <section className="gvf-page">
                <div className="gvf-box">
                    <header className="gvf-head">
                        <h1>Geschenkgutschein</h1>
                        <p>Waehle einen Betrag oder gib einen eigenen ein.</p>
                    </header>

                    <div className="gvf-top">
                        <div className="gvf-amounts">
                            <h2>Betrag auswaehlen</h2>

                            <div className="gvf-amount-grid">
                                {presetAmounts.map((value) => {
                                    const active = !useCustom && selectedAmount === value;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`gvf-amount-card ${active ? "is-active" : ""}`}
                                            onClick={() => {
                                                setUseCustom(false);
                                                setSelectedAmount(value);
                                            }}
                                        >
                                            <span className="gvf-radio" />
                                            <strong>EUR {value}</strong>
                                            <small>Einmalig</small>
                                        </button>
                                    );
                                })}
                            </div>

                            <div
                                className={`gvf-custom ${useCustom ? "is-active" : ""}`}
                                onClick={() => setUseCustom(true)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    (e.key === "Enter" || e.key === " ") &&
                                    setUseCustom(true)
                                }
                            >
                                <span className="gvf-radio" />
                                <div className="gvf-custom-body">
                                    <h3>Sonderbetrag</h3>
                                    <div className="gvf-custom-input">
                                        <span>EUR</span>
                                        <input
                                            type="number"
                                            min={10}
                                            max={500}
                                            placeholder="z.B. 150"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setUseCustom(true);
                                                setCustomAmount(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <p>Min 10 EUR, Max 500 EUR</p>
                                </div>
                            </div>
                        </div>

                        <aside className="gvf-preview" aria-hidden="true">
                            <div className="gvf-card gcf-back" />
                            <div className="gvf-card gcf-front">
                                <span className="gcf-chip" />
                                <span className="gcf-brand">URLAUB-ZEIT.DE</span>
                                <strong>Geschenkgutschein</strong>
                                <em>EUR {amount}</em>
                            </div>
                        </aside>
                    </div>

                    <section className="gvf-section">
                        <h2>Empfaengerinformationen</h2>
                        <div className="gvf-form-row">
                            <label>
                                Name des Empfaengers
                                <input
                                    type="text"
                                    placeholder="Vorname Nachname"
                                    value={recipientName}
                                    onChange={(e) =>
                                        setRecipientName(e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                E-Mail des Empfaengers
                                <input
                                    type="email"
                                    placeholder="beispiel@eposta.de"
                                    value={recipientEmail}
                                    onChange={(e) =>
                                        setRecipientEmail(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <label className="gvf-full">
                            Nachricht (auf die Karte geschrieben)
                            <textarea
                                rows={5}
                                placeholder="Frohe Feiertage!"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </label>
                    </section>

                    <section className="gvf-section">
                        <h2>Zusammenfassung</h2>
                        <div className="gvf-summary-grid">
                            <label>
                                Menge
                                <input
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value) || 1)
                                    }
                                />
                            </label>
                            <label>
                                Ausgewaehlter Betrag
                                <input type="text" value={`EUR ${amount}`} readOnly />
                            </label>
                            <label>
                                Gesamt
                                <input type="text" value={`EUR ${total}`} readOnly />
                            </label>
                        </div>

                        <div className="gvf-footer">
                            <div className="gvf-total">
                                <span>Gesamt</span>
                                <strong>EUR {total}</strong>
                            </div>
                            <button type="button" className="gvf-pay-btn">
                                Bezahlen
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </AppLayout>
    );
}