import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ContactSection from "@/Components/Contact/ContactSection";
import { useTranslation } from "@/i18n";

export default function KontaktPage({ currentRoute = "kontakt" }) {
    const { t } = useTranslation();
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title={`${t("contact.title")} – Werrapark Resort`} />
            <ContactSection />
        </AppLayout>
    );
}


