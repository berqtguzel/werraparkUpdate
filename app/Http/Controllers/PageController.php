<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use App\Services\PageService;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct(
        private PageService $pageService,
        private ApiHealthService $apiHealth,
    ) {}

    public function show(string $locale, string $slug)
    {
        $locale = strtolower($locale);
        $slug = strtolower($slug);

        $pageData = null;

        if ($this->apiHealth->isAvailable()) {
            $pageData = $this->pageService->getPage($slug, $locale);
        }

        if (!$pageData) {
            $pageData = $this->getFallbackPage($slug, $locale);
        }

        return Inertia::render('Dynamic/Page', [
            'page' => $pageData,
            'locale' => $locale,
        ]);
    }

    private function getFallbackPage(string $slug, string $locale): array
    {
        $pages = [
            'historie' => [
                'title' => $locale === 'en' ? 'History' : ($locale === 'tr' ? 'Tarihçe' : 'Historie'),
                'content' => $locale === 'en'
                    ? '<p>This is a demo page. Replace with real content later.</p>'
                    : ($locale === 'tr'
                        ? '<p>Bu bir demo sayfasıdır. Daha sonra gerçek içerikle değiştirilebilir.</p>'
                        : '<p>Bu bir demo sayfasıdır. Daha sonra gerçek içerikle değiştirilebilir.</p>'),
            ],
            'rooms' => [
                'title' => $locale === 'en' ? 'Rooms' : ($locale === 'tr' ? 'Odalar' : 'Zimmer'),
                'content' => $locale === 'en'
                    ? '<p>Demo rooms description.</p>'
                    : '<p>Demo oda açıklaması.</p>',
            ],
            'spa' => [
                'title' => 'Spa',
                'content' => $locale === 'en'
                    ? '<p>Demo spa content.</p>'
                    : '<p>Demo spa içeriği.</p>',
            ],
        ];

        $data = $pages[$slug] ?? [
            'title' => ucfirst($slug),
            'content' => $locale === 'en'
                ? '<p>Demo page. Content will be added.</p>'
                : '<p>Demo sayfa. İçerik daha sonra eklenecek.</p>',
        ];

        return array_merge($data, [
            'slug' => $slug,
            'locale' => $locale,
            'subtitle' => '',
            'heroImage' => null,
            'blocks' => [],
            'is_demo' => true,
        ]);
    }
}
