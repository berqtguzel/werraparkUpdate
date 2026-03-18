/**
 * Button tracking - sends click events to API via Laravel proxy
 */
const TRACK_URL = "/api/button-tracking/track";

export function trackButton(payload) {
    if (typeof window === "undefined" || !window.axios) return;

    const body = {
        button_id: payload.id ?? payload.button_id,
        button_label: payload.label ?? payload.button_label,
        button_name: payload.name ?? payload.button_name,
        page: payload.page ?? window.location.pathname,
        metadata: payload.metadata ?? {},
    };

    window.axios.post(TRACK_URL, body).catch(() => {});
}

export function useTrackClick(id, label, metadata = {}) {
    return () => trackButton({ button_id: id, button_label: label, metadata });
}
