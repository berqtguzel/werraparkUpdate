<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SliderService
{
    private const CACHE_KEY_PREFIX = 'omr_slider_';
    private const CACHE_TTL = 600;

    private const FALLBACK_SLUGS = ['hero', 'experience', 'home', 'main', 'default'];

    public function getSlider(string $slug, string $locale): ?array
    {
        $locale = strtolower($locale);
        $slug   = strtolower($slug);
        $cacheKey = self::CACHE_KEY_PREFIX . "{$locale}_{$slug}";

        $result = Cache::remember($cacheKey, self::CACHE_TTL, function () use ($slug, $locale) {
            $data = $this->fetch($slug, $locale);
            if ($data !== null) {
                return $data;
            }
            foreach (self::FALLBACK_SLUGS as $fallback) {
                if ($fallback === $slug) {
                    continue;
                }
                $data = $this->fetch($fallback, $locale);
                if ($data !== null) {
                    return $data;
                }
            }
            $data = $this->fetchList($locale);
            if ($data !== null) {
                return $data;
            }
            return null;
        });

        if ($result === null) {
            Cache::forget($cacheKey);
        }

        return $result;
    }

    public function clearCache(?string $slug = null): void
    {
        if ($slug) {
            foreach (['de', 'en', 'tr'] as $locale) {
                Cache::forget(self::CACHE_KEY_PREFIX . "{$locale}_{$slug}");
            }
        } else {
            foreach (['de', 'en', 'tr'] as $locale) {
                foreach (self::FALLBACK_SLUGS as $s) {
                    Cache::forget(self::CACHE_KEY_PREFIX . "{$locale}_{$s}");
                }
            }
        }
    }

    private function fetch(string $slug, string $locale): ?array
    {
        $base     = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant   = config('omr.main_tenant') ?: config('omr.tenant_id');

        if (!$base) {
            Log::debug('Slider API: OMR_API_BASE missing');
            return null;
        }

        if (!$tenant) {
            Log::debug('Slider API: OMR_TENANT_ID / OMR_MAIN_TENANT missing');
            return null;
        }

        $paths = [
            "{$base}{$endpoint}/sliders/{$slug}",
            "{$base}{$endpoint}/slider/{$slug}",
        ];

        foreach ($paths as $url) {
            $data = $this->doFetch($url, $slug, $locale, $tenant, $base);
            if ($data !== null) {
                return $data;
            }
        }

        return null;
    }

    private function doFetch(string $url, string $slug, string $locale, string $tenant, string $base): ?array
    {
        try {
            $response = Http::timeout(config('omr.timeout', 10))
                ->withHeaders([
                    'X-Tenant-ID'      => $tenant,
                    'Accept-Language'  => $locale,
                ])
                ->get($url, [
                    'locale' => $locale,
                    'lang'   => $locale,
                ]);

            if (!$response->successful()) {
                return null;
            }

            $json = $response->json();
            $data = $json['data'] ?? $json;

            if (!is_array($data)) {
                return null;
            }

            return $this->normalize($data, $base);
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * GET /v1/sliders - liste dönerse ilk slider'ı kullan
     */
    private function fetchList(string $locale): ?array
    {
        $base     = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant   = config('omr.main_tenant') ?: config('omr.tenant_id');

        if (!$base || !$tenant) {
            return null;
        }

        $url = "{$base}{$endpoint}/sliders";

        try {
            $response = Http::timeout(config('omr.timeout', 10))
                ->withHeaders([
                    'X-Tenant-ID'      => $tenant,
                    'Accept-Language'  => $locale,
                ])
                ->get($url, ['locale' => $locale, 'lang' => $locale]);

            if (!$response->successful()) {
                return null;
            }

            $json = $response->json();
            $list = $json['data'] ?? $json;

            if (!is_array($list)) {
                return null;
            }

            $first = $list[0] ?? null;
            if ($first && is_array($first)) {
                $attrs = $first['attributes'] ?? [];
                $data  = array_merge($first, $attrs);
                return $this->normalize($data, $base);
            }

            return $this->normalize($list, $base);
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function normalize(array $data, string $base): array
    {
        $items = $data['items'] ?? $data['slides'] ?? $data['images'] ?? [$data];

        $slides = [];
        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }
            $attrs = $item['attributes'] ?? $item;
            $img   = $attrs['image'] ?? $attrs['url'] ?? $attrs['src'] ?? $attrs['media'] ?? null;

            if (is_array($img)) {
                $img = $img['url'] ?? $img['data']['attributes']['url'] ?? null;
            }
            if ($img && !str_starts_with($img, 'http')) {
                $img = $base . (str_starts_with($img, '/') ? '' : '/') . $img;
            }

            $slides[] = [
                'image'       => $img,
                'title'       => $attrs['title'] ?? $attrs['heading'] ?? '',
                'description' => $attrs['description'] ?? $attrs['content'] ?? $attrs['text'] ?? '',
                'link'        => $attrs['link'] ?? $attrs['url'] ?? null,
                'alt'         => $attrs['alt'] ?? $attrs['title'] ?? '',
            ];
        }

        return [
            'slug'  => $data['slug'] ?? null,
            'title' => $data['title'] ?? $data['name'] ?? null,
            'slides' => $slides,
        ];
    }
}
