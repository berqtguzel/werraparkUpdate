import React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { ThemeProvider } from "@/Context/ThemeContext";
export default function AppLayout({ children, currentRoute }) {
    return (
        <ThemeProvider>
            <Header currentRoute={currentRoute} />

            <main>{children}</main>
            <Footer />
        </ThemeProvider>
    );
}
