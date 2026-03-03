import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ContactSection from "@/Components/Contact/ContactSection";

export default function KontaktPage({ currentRoute = "kontakt" }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Kontakt – Werrapark Resort" />
            <ContactSection />
        </AppLayout>
    );
}


