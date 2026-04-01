import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import SeoHead from "@/Components/SeoHead";
import { useTranslation } from "@/i18n";
import ReviewsSection from "@/Components/Reviews/ReviewsSection";
const Index = () => {
    return (
        <AppLayout>
            <SeoHead title="Reviews" />
            <ReviewsSection />
        </AppLayout>
    );
};

export default Index;
