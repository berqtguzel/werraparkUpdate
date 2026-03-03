import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/gift-voucher-promo.css";

export default function GiftVoucherPromo() {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const href = `/${locale}/gutschein`;

    return (
        <section className="gvp-wrap" aria-label="Geschenkgutschein">
            <div className="gvp-shell">
                <div className="gvp-copy">
                    <span className="gvp-badge">Neu</span>
                    <h2 className="gvp-title">
                        Verschenke <span>Auszeit</span> - Geschenkgutscheine
                    </h2>
                    <p className="gvp-desc">
                        Digital in Sekunden oder als stilvolle Karte. Flexibel
                        einlosbar und perfekt fur Geburtstage, Jubilaen und
                        besondere Momente im Werrapark Resort.
                    </p>

                    <div className="gvp-actions">
                        <Link className="gvp-btn gvp-btn--primary" href={href}>
                            Jetzt verschenken
                        </Link>
                        <Link className="gvp-btn gvp-btn--ghost" href={href}>
                            So funktioniert's
                        </Link>
                    </div>

                    <ul className="gvp-list" aria-label="Vorteile">
                        <li>Sofort lieferbar</li>
                        <li>10-500 EUR wahlbar</li>
                        <li>1 Jahre gultig</li>
                    </ul>
                </div>

                <div className="gvp-visual" aria-hidden="true">
                    <div className="gvp-card gvp-card--back" />
                    <div className="gvp-card gvp-card--front">
                        <span className="chip" />
                        <span className="brand">WR</span>
                        <strong>Geschenkgutschein</strong>
                        <em>10-500 EUR</em>
                    </div>
                </div>
            </div>
        </section>
    );
}


