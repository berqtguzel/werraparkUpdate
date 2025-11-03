import React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function AppLayout({ children, currentRoute }) {
    return (
        <>
            <Header currentRoute={currentRoute} />
            <main>{children}</main>
            <Footer />
        </>
    );
}
