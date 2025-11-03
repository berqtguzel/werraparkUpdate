import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Hero from "@/Components/Hero";
import Features from "@/Components/Home/Features";
import RoomsPreview from "@/Components/Home/RoomsPreview";
import ContactTeaser from "@/Components/Home/ContactTeaser";

export default function HomeIndex({ currentRoute = "home" }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Werrapark Hotel – Ihre Oase der Ruhe" />
            <Hero />
            <section className="intro container">
                <h2>Entdecken Sie den Werrapark</h2>
                <p>
                    Bei uns finden Sie Ruhe und Erholung mitten im Thüringer
                    Wald. Ob Wellness, Wandern oder Familienurlaub – wir bieten
                    den perfekten Rahmen.
                </p>
            </section>
            <Features />
            <RoomsPreview />
            <ContactTeaser />
        </AppLayout>
    );
}
