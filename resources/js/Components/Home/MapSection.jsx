import React, { useEffect, useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "@/i18n";
import "../../../css/map-section.css";

const WERRAPARK_POSITION = [50.5167, 10.7833];
const GERMANY_CENTER = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

const DEFAULTS = {
    markerAddress: "R.-Breitscheid-Straße 41–45, 98574 Masserberg",
};

function getContactFromSettings(contact) {
    if (!contact) return null;
    const infos = contact.contact_infos ?? [];
    if (!infos.length) return null;
    const primary = infos.find((c) => c?.is_primary) ?? infos[0];
    return primary;
}

function buildMapHref(mapUrl, markerPosition, markerAddress) {
    if (typeof mapUrl === "string" && mapUrl.trim() !== "") {
        return mapUrl.trim();
    }

    const [lat, lng] = Array.isArray(markerPosition) ? markerPosition : [];
    if (typeof lat === "number" && typeof lng === "number") {
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    const query = encodeURIComponent(markerAddress || DEFAULTS.markerAddress);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function MapSection({
    title,
    subtitle,
    markerTitle,
    markerAddress: markerAddressProp,
}) {
    const { t } = useTranslation();
    const { props } = usePage();
    const [isClient, setIsClient] = useState(false);
    const [MapSectionClient, setMapSectionClient] = useState(null);

    const contactData = useMemo(() => {
        const contact = props?.global?.settings?.contact;
        const info = getContactFromSettings(contact);
        if (!info) return null;

        const lat = parseFloat(info.latitude);
        const lng = parseFloat(info.longitude);
        const hasCoords = !Number.isNaN(lat) && !Number.isNaN(lng);

        const addr = [info.address, info.city, info.district, info.country]
            .filter(Boolean)
            .join(", ");

        return {
            markerPosition: hasCoords ? [lat, lng] : WERRAPARK_POSITION,
            markerTitle: info.title ?? markerTitle,
            markerAddress:
                addr || (markerAddressProp ?? DEFAULTS.markerAddress),
            mapUrl: info.map,
        };
    }, [props?.global?.settings?.contact, markerTitle, markerAddressProp]);

    const markerPosition = contactData?.markerPosition ?? WERRAPARK_POSITION;
    const titleResolved = title ?? t("map.title");
    const subtitleResolved = subtitle ?? t("map.subtitle");
    const markerTitleResolved =
        contactData?.markerTitle ?? markerTitle ?? t("map.markerTitle");
    const markerAddressResolved =
        contactData?.markerAddress ??
        markerAddressProp ??
        DEFAULTS.markerAddress;
    const mapHref = buildMapHref(
        contactData?.mapUrl,
        markerPosition,
        markerAddressResolved,
    );

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        let isMounted = true;

        import("./MapSectionClient").then((module) => {
            if (isMounted) {
                setMapSectionClient(() => module.default);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [isClient]);

    if (!isClient || !MapSectionClient) {
        return (
            <section className="mp-section" aria-label={t("map.openMap")}>
                <div className="mp-placeholder">
                    <div className="mp-placeholder-inner">
                        <span className="mp-placeholder-icon">🗺️</span>
                        <p>{t("map.loading")}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <MapSectionClient
            titleResolved={titleResolved}
            subtitleResolved={subtitleResolved}
            markerTitleResolved={markerTitleResolved}
            markerAddressResolved={markerAddressResolved}
            markerPosition={markerPosition}
            mapHref={mapHref}
            defaultZoom={DEFAULT_ZOOM}
            openMapLabel={t("map.openMap")}
            eyebrowLabel={t("map.eyebrow")}
        />
    );
}
