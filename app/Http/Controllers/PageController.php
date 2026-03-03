<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function show(string $locale, string $slug)
    {
        $locale = strtolower($locale);
        $slug   = strtolower($slug);

        // Demo içerikler (API yok)
        $pages = [
            'historie' => [
                'title'   => $locale === 'en' ? 'History' : 'Historie',
                'content' => $locale === 'en'
                    ? '<p>This is a demo page. Replace with real content later.</p>'
                    : '<p>Bu bir demo sayfasıdır. Daha sonra gerçek içerikle değiştirilebilir.</p>',
            ],
            'rooms' => [
                'title'   => $locale === 'en' ? 'Rooms' : 'Zimmer',
                'content' => $locale === 'en'
                    ? '<p>Demo rooms description.</p>'
                    : '<p>Demo oda açıklaması.</p>',
            ],
            'spa' => [
                'title'   => 'Spa',
                'content' => $locale === 'en'
                    ? '<p>Demo spa content.</p>'
                    : '<p>Demo spa içeriği.</p>',
            ],
            // İstersen diğer slug’ları da buraya ekleyebilirsin
        ];

        // slug listede var ama içerik tanımlı değilse de demo üret
        $pageData = $pages[$slug] ?? [
            'title'   => ucfirst($slug),
            'content' => $locale === 'en'
                ? '<p>Demo page. Content will be added.</p>'
                : '<p>Demo sayfa. İçerik daha sonra eklenecek.</p>',
        ];

        // Frontend'in bekleyeceği şekilde payload
        $pageData = array_merge($pageData, [
            'slug'    => $slug,
            'locale'  => $locale,
            'is_demo' => true,
        ]);

        return Inertia::render('Dynamic/Page', [
            'page'   => $pageData,
            'locale' => $locale,
        ]);
    }
}
