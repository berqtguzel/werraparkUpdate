<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WidgetService
{
    private const CACHE_PREFIX = 'omr_widget_';
    private const CACHE_TTL = 600;

    public function getWidgets(string $locale): array
    {
        $cacheKey = self::CACHE_PREFIX . $locale;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($locale) {
            return [
                'ratings' => $this->fetchRatings($locale),
                'whatsapp' => $this->fetchWhatsApp($locale),
                'serviceHighlights' => $this->fetchServiceHighlights($locale),
            ];
        });
    }

    private function fetchRatings(string $locale): array
    {
        return $this->fetch("widgets/ratings", $locale);
    }

    private function fetchWhatsApp(string $locale): array
    {
        return $this->fetch("widgets/whatsapp", $locale);
    }

    private function fetchServiceHighlights(string $locale): array
    {
        return $this->fetch("widgets/service-highlights", $locale);
    }

    private function fetch(string $path, string $locale): array
    {
        $base = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant = config('omr.tenant_id');

        if (!$tenant || !$base) {
            return [];
        }

        try {
            $response = Http::timeout(8)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->get("{$base}{$endpoint}/{$path}", ['lang' => $locale]);

            if ($response->successful()) {
                $json = $response->json();
                return $json['data'] ?? $json ?? [];
            }
        } catch (\Throwable $e) {
            Log::debug("Widget API failed: {$path}", ['error' => $e->getMessage()]);
        }

        return [];
    }
}
