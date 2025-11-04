<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index(Request $request)
    {

        $content = [
            'hero_title'   => 'Umfassende Lösungen für Ihre Anlagen',
            'hero_sub'     => 'Seit über 25 Jahren unterstützen wir mit Reinigung, Instandhaltung und Bauleistungen – zuverlässig, effizient und nachhaltig.',
            'hero_cta'     => 'Kostenloses Angebot',
            'section1'     => 'Branchenlösungen für Hotels & Gastgewerbe',
            'section2'     => 'Professionelle Reinigungslösungen',
            'section3'     => 'Sanierung, Renovierung & Bau',
            'trust_title'  => 'Was auch immer Ihr Projekt ist – verlassen Sie sich auf uns',
            'trust_sub'    => 'Mit deutscher Gründlichkeit und Qualitätsanspruch begleiten wir Ihr Vorhaben vom ersten Schritt bis zur Übergabe.',
            'trust_cta'    => 'Anfrage stellen',
        ];


        $cards = [

            'hotels' => [
                [
                    'title' => 'Hotel Housekeeping & Reinigung',
                    'desc'  => 'Zimmerreinigung, öffentliche Bereiche, Turn-Down-Service und Sonderreinigungen – alles aus einer Hand.',
                    'image' => '/images/services/hotel-room.jpg',
                ],
                [
                    'title' => 'Küchen- & Gastronomiereinigung',
                    'desc'  => 'Hygienekonforme Reinigung von Großküchen inkl. Fettabscheider, Geräte & Flächen.',
                    'image' => '/images/services/kitchen.jpg',
                ],
                [
                    'title' => 'Stewarding & Spüldienste',
                    'desc'  => '24/7-Schichtbetrieb, Spülküche, Mülltrennung, HACCP-konforme Abläufe.',
                    'image' => '/images/services/stewarding.jpg',
                ],
            ],

            'cleaning' => [
                [
                    'title' => 'Büro- & Unterhaltsreinigung',
                    'desc'  => 'Regelmäßige Reinigung von Büros, Sanitär, Teeküchen – planbar & effizient.',
                    'image' => '/images/services/office.jpg',
                ],
                [
                    'title' => 'Baureinigung & Zwischenreinigung',
                    'desc'  => 'Grobreinigung, Feinreinigung und Übergabe – terminsicher auf der Baustelle.',
                    'image' => '/images/services/site.jpg',
                ],
                [
                    'title' => 'Glas- & Fassadenreinigung',
                    'desc'  => 'Streifenfreie Glasflächen, Rahmenreinigung, Hubarbeitsbühne & Osmoseverfahren.',
                    'image' => '/images/services/facade.jpg',
                ],
            ],

            'construction' => [
                [
                    'title' => 'Innenraum-Renovierung & Trockenbau',
                    'desc'  => 'Malerarbeiten, Spachteln, Trockenbauwände & Decken – schlüsselfertig.',
                    'image' => '/images/services/renovation.jpg',
                ],
                [
                    'title' => 'Bodenarbeiten & Abdichtung',
                    'desc'  => 'PVC, Vinyl, Laminat, Fliesen sowie Abdichtungen nach Stand der Technik.',
                    'image' => '/images/services/floor.jpg',
                ],
                [
                    'title' => 'Demontage & Entsorgung',
                    'desc'  => 'Selektiver Rückbau, Entkernung, Containerservice & fachgerechte Entsorgung.',
                    'image' => '/images/services/demolition.jpg',
                ],
            ],
        ];

        return Inertia::render('Services', [
            'content'      => $content,
            'cards'        => $cards,
            'currentRoute' => 'services',
        ]);
    }
}
