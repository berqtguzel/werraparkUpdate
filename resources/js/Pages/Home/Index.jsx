import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Hero from "@/Components/hero";
import SplashCursor from "@/Components/SplashCursor";
import Hotels from "@/Components/Home/Hotels";

import TeamGrid from "@/Components/Home/TeamGrid";
import VideoPromo from "@/Components/Home/VideoPromo";
import OffersGrid from "@/Components/Home/OffersGrid";
import ExperienceHero from "@/Components/Home/ExperienceHero";
import RoomsShowcase from "@/Components/Home/RoomsShowcase";
import RoomsGallery from "@/Components/Home/RoomGallery";
import TravelThemes from "@/Components/Home/TravelThemes";

export default function HomeIndex({ currentRoute = "home" }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title="Werrapark Hotel – Ihre Oase der Ruhe" />
            <Hero />
            <Hotels />
            <TeamGrid colors={["#34d399", "#60a5fa", "#a5f3fc", "#bef264"]} />
            <VideoPromo
                title="Schauen Sie sich unser Werbevideo an"
                poster="/images/Thumbnail2.webp"
                videoId="Im4qJM0N0c8"
                alt="Werrapark Resort – Werbevideo"
            />
            <OffersGrid />
            <ExperienceHero />
            <RoomsShowcase />
            <RoomsGallery />
            <TravelThemes />
        </AppLayout>
    );
}
