<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SettingsService;

class SettingsController extends Controller
{
    public function __construct(
        private SettingsService $settingsService
    ) {}

    /**
     * Tüm settings'leri döndür
     */
    public function index(Request $request): array
    {
        $locale = $request->query('locale') ?? $request->route('locale') ?? config('omr.default_locale', 'de');
        return $this->settingsService->getAll($locale);
    }

    /**
     * Frontend için gerekli settings
     */
    public function frontend(Request $request): array
    {
        $locale = $request->query('locale') ?? $request->route('locale') ?? config('omr.default_locale', 'de');
        return $this->settingsService->getForFrontend($locale);
    }

    /**
     * Tek bir setting grubu
     */
    public function show(Request $request, string $key): array
    {
        $locale = $request->query('locale') ?? $request->route('locale') ?? config('omr.default_locale', 'de');
        return $this->settingsService->get($key, $locale);
    }

    /**
     * Cache temizle
     */
    public function clearCache(): array
    {
        $this->settingsService->clearCache();

        return ['success' => true, 'message' => 'Settings cache cleared'];
    }
}
