import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import ContactSection from "@/Components/Contact/ContactSection";
import SeoHead from "@/Components/SeoHead";
import { useTranslation } from "@/i18n";

export default function KontaktPage({ currentRoute = "kontakt" }) {
    const { t } = useTranslation();
    return (
        <AppLayout currentRoute={currentRoute}>
            <SeoHead title={t("contact.title")} />
            <ContactSection />
        </AppLayout>
    );
}


