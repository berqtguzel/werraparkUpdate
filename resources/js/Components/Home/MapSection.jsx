import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../css/map-section.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const WERRAPARK_POSITION = [50.5167, 10.7833];
const GERMANY_CENTER = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

export default function MapSection({
    title = "Werrapark Resort – Mitten in Deutschland",
    subtitle = "Entdecken Sie uns im Herzen des Thüringer Waldes, umgeben von unberührter Natur.",
    markerPosition = WERRAPARK_POSITION,
    markerTitle = "Werrapark Resort",
    markerAddress = "R.-Breitscheid-Straße 41–45, 98574 Masserberg",
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <section className="mp-section" aria-label="Standortkarte">
                <div className="mp-placeholder">
                    <div className="mp-placeholder-inner">
                        <span className="mp-placeholder-icon">🗺️</span>
                        <p>Karte wird geladen…</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="mp-section" aria-label="Standortkarte">
            <div className="mp-header">
                <span className="mp-eyebrow">Standort</span>
                <h2 className="mp-title">{title}</h2>
                <p className="mp-subtitle">{subtitle}</p>
            </div>

            <div className="mp-map-wrap">
                <MapContainer
                    center={GERMANY_CENTER}
                    zoom={DEFAULT_ZOOM}
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
                            <strong>{markerTitle}</strong>
                            <br />
                            {markerAddress}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
}
