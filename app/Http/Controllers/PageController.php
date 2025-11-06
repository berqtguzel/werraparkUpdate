<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Serve a dynamic page for header slugs.
     */
    public function show(Request $request, string $slug = null)
    {
        // Derive slug from path if not explicitly provided by the route
        if ($slug === null || $slug === '') {
            $slug = trim($request->path(), '/');
        }

        $map = $this->pagesMap();

        // Fallback to a simple page if slug not predefined
        $page = $map[$slug] ?? [
            'title' => ucfirst(str_replace('-', ' ', $slug)),
            'subtitle' => null,
            'heroImage' => null,
            'blocks' => [
                ['type' => 'text', 'content' => 'Inhalt wird in Kürze aktualisiert.'],
            ],
        ];

        return Inertia::render('Dynamic/Page', array_merge($page, [
            'currentRoute' => $slug,
        ]));
    }

    private function pagesMap(): array
    {
        return [
            'impressum' => [
                'title' => 'Impressum',
                'subtitle' => 'Angaben gemäß § 5 TMG',
                'heroImage' => null,
                'blocks' => [
                    ['type' => 'text', 'heading' => 'Betreiber', 'html' => '<p>Werrapark Resort<br/>Beispielstraße 1<br/>98666 Masserberg</p>'],
                    ['type' => 'text', 'heading' => 'Kontakt', 'html' => '<p>Telefon: 036874 205706<br/>E-Mail: info@werrapark.de</p>'],
                    ['type' => 'text', 'heading' => 'USt-IdNr.', 'content' => 'DE123456789'],
                    ['type' => 'text', 'heading' => 'Inhaltlich Verantwortlicher', 'content' => 'Gemäß § 55 Abs. 2 RStV: Werrapark Resort'],
                ],
            ],
            'kontakt' => [
                'subtitle' => 'Wir helfen Ihnen gern weiter.',
                'heroImage' => null,
                'blocks' => [
                    ['type' => 'text', 'heading' => 'Erreichbarkeit', 'html' => '<p>E-Mail: info@werrapark.de<br/>Telefon: 036874 205706</p>'],
                    ['type' => 'text', 'heading' => 'Adresse', 'html' => '<p>Werrapark Resort<br/>Beispielstraße 1<br/>98666 Masserberg</p>'],
                ],
            ],
            // New header pages
            'historie' => [
                'title' => 'Historie',
                'subtitle' => 'Unsere Geschichte und Meilensteine.',
                'heroImage' => '/images/template2.png',
                'blocks' => [
                    ['type' => 'text', 'heading' => 'Anfänge', 'content' => 'Wie alles begann.'],
                    ['type' => 'list', 'heading' => 'Meilensteine', 'items' => ['1999 – Gründung', '2008 – Erweiterung', '2017 – Digitalisierung']],
                ],
            ],
            'gaeste-abc' => [
                'title' => 'Gäste ABC',
                'subtitle' => 'Alle wichtigen Informationen von A bis Z.',
                'heroImage' => null,
                'blocks' => [['type' => 'text', 'content' => 'Hausordnung, Check-in/Check-out, Services, WLAN und mehr.']],
            ],
            'urlaubsthemen' => [
                'title' => 'Urlaubsthemen',
                'subtitle' => 'Natur, Familie, Wellness – Ihr Traumurlaub in Themen.',
                'heroImage' => '/images/template1.webp',
                'blocks' => [['type' => 'text', 'content' => 'Entdecken Sie passende Angebote und Inspiration.']],
            ],
            'galerie' => [
                'title' => 'Galerie',
                'subtitle' => 'Einblicke in unser Resort und die Umgebung.',
                'heroImage' => '/images/template3.png',
                'blocks' => [['type' => 'image', 'src' => '/images/template1.webp', 'alt' => 'Galerie Beispiel']],
            ],
            'karriere' => [
                'title' => 'Karriere',
                'subtitle' => 'Werde Teil unseres Teams.',
                'heroImage' => null,
                'blocks' => [['type' => 'text', 'content' => 'Offene Stellen und Benefits.']],
            ],
            'bewertungen' => [
                'title' => 'Bewertungen',
                'subtitle' => 'Das sagen unsere Gäste.',
                'heroImage' => null,
                'blocks' => [['type' => 'text', 'content' => 'Auszüge aus Gästefeedback und Auszeichnungen.']],
            ],
            'veranstaltung' => [
                'title' => 'Veranstaltung',
                'subtitle' => 'Events und Tagungen im Werrapark.',
                'heroImage' => '/images/template2.png',
                'blocks' => [['type' => 'text', 'content' => 'Räume, Technik, Service – alles aus einer Hand.']],
            ],
            'gutscheinshop' => [
                'title' => 'Gutscheinshop',
                'subtitle' => 'Freude schenken – Gutscheine für besondere Momente.',
                'heroImage' => null,
                'blocks' => [['type' => 'text', 'content' => 'Wert- und Themen-Gutscheine.']],
            ],
            'rooms' => [
                'title' => 'Zimmer & Suiten',
                'subtitle' => 'Komfort, Ruhe und Natur – wählen Sie Ihr Zuhause auf Zeit.',
                'heroImage' => '/images/template3.png',
                'blocks' => [
                    ['type' => 'text', 'heading' => 'Unsere Auswahl', 'content' => 'Von gemütlichen Zimmern bis exklusiven Suiten.'],
                    ['type' => 'image', 'src' => '/images/template1.webp', 'alt' => 'Zimmer', 'caption' => 'Beispielansicht'],
                ],
            ],
            'dining' => [
                'title' => 'Restaurant',
                'subtitle' => 'Regionale Küche, frische Zutaten, echt Thüringen.',
                'heroImage' => '/images/template2.png',
                'blocks' => [
                    ['type' => 'text', 'heading' => 'Kulinarik', 'content' => 'Saisonal, regional, nachhaltig.'],
                ],
            ],
            'activities' => [
                'title' => 'Aktivitäten',
                'subtitle' => 'Wandern, Radfahren, Wellness und mehr – direkt vor der Tür.',
                'heroImage' => '/images/template1.webp',
                'blocks' => [['type' => 'list', 'heading' => 'Erleben', 'items' => ['Wanderrouten', 'Radtouren', 'Familienprogramm']]],
            ],
            'spa' => [
                'title' => 'Spa',
                'subtitle' => 'Entspannung für Körper und Geist.',
                'heroImage' => '/images/template3.png',
                'blocks' => [['type' => 'text', 'content' => 'Massagen, Sauna, Pool – Ihre Auszeit.']],
            ],
            'events' => [
                'title' => 'Events',
                'subtitle' => 'Tagungen, Feiern, besondere Momente – perfekt organisiert.',
                'heroImage' => '/images/template2.png',
                'blocks' => [['type' => 'text', 'content' => 'Räume, Technik und Service aus einer Hand.']],
            ],
            // DİKKAT: 'contact' burada YOK artık
        ];
    }
}
