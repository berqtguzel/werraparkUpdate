<?php

namespace App\Http\Controllers;

use App\Services\HolidayThemeService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Inertia\Inertia;
use Inertia\Response;

class ThemeController extends Controller
{
    public function __construct(
        private HolidayThemeService $holidayThemeService,
    ) {}

    public function show(string $locale, string $theme): Response
    {
        $locale = strtolower($locale);
        $themes = $this->holidayThemeService->getThemes($locale);
        $exists = collect($themes)->contains(function ($item) use ($theme) {
            $slug = (string) ($item['slug'] ?? $item['id'] ?? '');

            return (string) ($item['id'] ?? '') === (string) $theme
                || $slug === (string) $theme;
        });

        if (! $exists) {
            throw new NotFoundHttpException();
        }

        return Inertia::render('Themes/Show', [
            'currentRoute' => 'urlaubsthemen',
            'locale' => $locale,
            'theme' => $theme,
            'themes' => $themes,
        ]);
    }
}
