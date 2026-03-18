import React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import CookieConsent from "@/Components/CookieConsent";
import WhatsAppWidget from "@/Components/WhatsAppWidget";
import { ThemeProvider } from "@/Context/ThemeContext";
import TargetCursor from "@/Components/ReactBits/Animations/TargetCursor";
import SplashCursor from "@/Components/ReactBits/Animations/SplashCursor";
import { trackButton } from "@/utils/buttonTracking";

export default function AppLayout({ children, currentRoute }) {
    React.useEffect(() => {
        const handler = (e) => {
            const el = e.target.closest("[data-track]");
            if (el && window.axios) {
                const id = el.getAttribute("data-track-id") ?? el.getAttribute("data-track");
                const label = el.getAttribute("data-track-label") ?? el.textContent?.trim?.()?.slice(0, 100);
                if (id) trackButton({ button_id: id, button_label: label });
            }
        };
        document.addEventListener("click", handler, true);
        return () => document.removeEventListener("click", handler, true);
    }, []);
    return (
        <ThemeProvider>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TargetCursor
                    targetSelector="a, button, [role='button'], input, textarea, select, summary, .cursor-target"
                    spinDuration={2.2}
                    hoverDuration={0.22}
                    parallaxOn
                    hideDefaultCursor
                />
                <Header currentRoute={currentRoute} />

                <main
                    style={{
                        flex: 1,
                        paddingTop: "150px",
                    }}
                >
                    {children}
                </main>

                <Footer />
                <WhatsAppWidget />
                <CookieConsent />
            </div>
        </ThemeProvider>
    );
}
