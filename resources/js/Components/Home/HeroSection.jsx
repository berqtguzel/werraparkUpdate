import React from "react";
import { motion } from "motion/react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.15 },
    },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection({ content }) {
    return (
        <div className="relative h-[600px] overflow-hidden flex items-center justify-center text-white">
            <motion.video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <source src="/videos/headerVideo.mp4" type="video/mp4" />
                Ihr Browser unterstützt das Video-Tag nicht.
            </motion.video>

            <motion.div
                className="absolute inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />

            <motion.div
                className="relative text-center z-10 p-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold leading-tight"
                    variants={item}
                >
                    {content?.hero_title ||
                        "Umfassende Lösungen für Ihre Anlagen und Gebäude"}
                </motion.h1>

                <motion.p
                    className="mt-4 text-xl md:text-2xl font-light max-w-3xl mx-auto"
                    variants={item}
                >
                    Mit über 25 Jahren Erfahrung bieten wir maßgeschneiderte,
                    integrierte Lösungen für Reinigung, Pflege und
                    Instandhaltung.
                </motion.p>

                <motion.div className="mt-10 space-x-4" variants={item}>
                    <a
                        href="#services"
                        className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition duration-300"
                    >
                        Unsere Leistungen entdecken
                    </a>
                    <a
                        href="#contact"
                        className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900 transition duration-300"
                    >
                        Kontakt aufnehmen
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
