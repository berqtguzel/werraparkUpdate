import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Hero from "@/Components/hero";
import Features from "@/Components/Features";
import RoomsPreview from "@/Components/RoomsPreview";
import ContactTeaser from "@/Components/ContactTeaser";
import Hotels from "@/Components/Home/Hotels";

import demoTeam from "@/Data/demoData";
import TeamGrid from "@/Components/Home/TeamGrid";
import VideoPromo from "@/Components/Home/VideoPromo";
export default function HomeIndex({ currentRoute = "home" }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Werrapark Hotel – Ihre Oase der Ruhe" />
            <Hero />
            <Hotels />
            <TeamGrid colors={["#34d399", "#60a5fa", "#a5f3fc", "#bef264"]} />
            <VideoPromo
                title="Schauen Sie sich unser Werbevideo an"
                poster="/images/werrapark-video-poster.jpg"
                videoId="Im4qJM0N0c8" // YouTube video ID
                alt="Werrapark Resort – Werbevideo"
            />
            <Features />
            <RoomsPreview />
            <ContactTeaser />
        </AppLayout>
    );
}
