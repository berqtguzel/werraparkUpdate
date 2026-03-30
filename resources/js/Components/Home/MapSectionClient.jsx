import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapSectionClient({
    titleResolved,
    subtitleResolved,
    markerTitleResolved,
    markerAddressResolved,
    markerPosition,
    mapHref,
    defaultZoom,
    openMapLabel,
    eyebrowLabel,
}) {
    return (
        <section className="mp-section" aria-label={openMapLabel}>
            <div className="mp-header">
                <span className="eyebrow">{eyebrowLabel}</span>
                <h1 className="mp-title">{titleResolved}</h1>
                <p className="mp-subtitle">{subtitleResolved}</p>
                <a
                    className="mp-map-link"
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {openMapLabel}
                </a>
            </div>

            <div className="mp-map-wrap">
                <MapContainer
                    center={markerPosition}
                    zoom={defaultZoom}
                    className="mp-map"
                    scrollWheelZoom={true}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={markerPosition}>
                        <Popup>
                            <strong>{markerTitleResolved}</strong>
                            <br />
                            {markerAddressResolved}
                            {mapHref ? (
                                <>
                                    <br />
                                    <a
                                        href={mapHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            marginTop: "8px",
                                            display: "inline-block",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {openMapLabel} →
                                    </a>
                                </>
                            ) : null}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
}
