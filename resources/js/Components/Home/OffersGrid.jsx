import React, { useMemo } from "react";
import FlowingMenu from "../ReactBits/Components/FlowingMenu";
import "../../../css/offers-grid.css";
import OFFERS from "@/Data/OffersData";

const OffersGrid = () => {
    const items = useMemo(
        () =>
            OFFERS.map((o) => ({
                link: o.href || "#",
                text: o.subtitle ? `${o.title} — ${o.subtitle}` : o.title,
                image: o.image,
            })),
        []
    );

    return (
        <section className="og-wrap">
            <h2 className="og-title">Information zu den Angeboten</h2>

            {/* FlowingMenu container */}
            <div className="og-flow-shell">
                <FlowingMenu items={items} />
            </div>
        </section>
    );
};

export default OffersGrid;
