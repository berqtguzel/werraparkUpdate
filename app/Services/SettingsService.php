<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SettingsService
{
    private const CACHE_KEY_PREFIX = 'omr_settings_';
    private const CACHE_TTL = 600;

    private const SETTINGS_KEYS = [
        'general',
        'contact',
        'social',
        'branding',
        'colors',
        'analytics',
        'seo',
        'performance',
        'email',
        'footer',
        'custom-code',
    ];

    /**
     * Tüm settings'leri API'den çeker
     */
    public function getAll(?string $locale = null): array
    {
        $locale = $locale ?? config('omr.default_locale', 'de');
        $cacheKey = self::CACHE_KEY_PREFIX . 'all:' . $locale;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($locale) {
            $result = [];

            foreach (self::SETTINGS_KEYS as $key) {
                $result[$key] = $this->fetch($key, $locale);
            }

            return $result;
        });
    }

    /**
     * Tek bir setting grubunu çeker
     */
    public function get(string $key, ?string $locale = null): array
    {
        if (!in_array($key, self::SETTINGS_KEYS, true)) {
            return [];
        }

        $locale = $locale ?? config('omr.default_locale', 'de');
        $cacheKey = self::CACHE_KEY_PREFIX . $key . ':' . $locale;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($key, $locale) {
            return $this->fetch($key, $locale);
        });
    }

    /**
     * Frontend için gerekli settings (header, footer, branding vb.)
     */
    public function getForFrontend(string $locale): array
    {
        $locale = strtolower($locale);
        $cacheKey = self::CACHE_KEY_PREFIX . 'frontend:' . $locale;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($locale) {
            return [
                'general'     => $this->normalize($this->fetch('general', $locale)),
                'contact'     => $this->normalizeContact($this->normalize($this->fetch('contact', $locale))),
                'social'      => $this->normalize($this->fetch('social', $locale)),
                'branding'    => $this->normalizeBranding($this->fetch('branding', $locale)),
                'colors'      => $this->normalize($this->fetch('colors', $locale)),
                'footer'      => $this->normalize($this->fetch('footer', $locale)),
                'seo'         => $this->normalize($this->fetch('seo', $locale)),
                'analytics'   => $this->normalize($this->fetch('analytics', $locale)),
                'custom_code' => $this->normalize($this->fetch('custom-code', $locale)),
            ];
        });
    }

    /**
     * Cache'i temizle (settings güncellendiğinde)
     */
    public function clearCache(): void
    {
        $tags = ['de', 'en', 'tr'];
        foreach (self::SETTINGS_KEYS as $key) {
            foreach ($tags as $locale) {
                Cache::forget(self::CACHE_KEY_PREFIX . $key . ':' . $locale);
            }
        }
        foreach ($tags as $locale) {
            Cache::forget(self::CACHE_KEY_PREFIX . 'all:' . $locale);
            Cache::forget(self::CACHE_KEY_PREFIX . 'frontend:' . $locale);
        }
    }

    /**
     * Medya/obje alanlarını URL string'e çevirir (Strapi vb. formatları destekler)
     */
    private function resolveMediaUrl(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }
        if (is_string($value)) {
            return $this->ensureAbsoluteUrl($value);
        }
        if (is_array($value)) {
            $url = $value['url'] ?? $value['src'] ?? null;
            if (!$url && isset($value['data']['attributes']['url'])) {
                $url = $value['data']['attributes']['url'];
            }
            if (!$url && isset($value['data']['url'])) {
                $url = $value['data']['url'];
            }
            if ($url) {
                return $this->ensureAbsoluteUrl($url);
            }
        }
        return null;
    }

    private function ensureAbsoluteUrl(string $url): string
    {
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }
        $base = rtrim(config('omr.base_url'), '/');
        return $base . (str_starts_with($url, '/') ? '' : '/') . $url;
    }

    /**
     * Branding: logo, dark_logo, light_logo vb. alanları normalize eder
     */
    private function normalizeBranding(array $data): array
    {
        $base = rtrim(config('omr.base_url'), '/');
        $out = [];

        foreach ($data as $k => $v) {
            if ($k === '_meta') {
                $out[$k] = $v;
                continue;
            }
            if (in_array($k, ['logo', 'dark_logo', 'light_logo', 'favicon', 'logo_light', 'logo_dark'], true)) {
                $resolved = $this->resolveMediaUrl($v);
                $out[$k] = $resolved;
                $out[str_replace('_', '', $k)] = $resolved;
            } else {
                $out[$k] = $v;
            }
        }

        $out['logo_light'] = $out['logo_light'] ?? $out['light_logo'] ?? $out['lightlogo'] ?? null;
        $out['logo_dark'] = $out['logo_dark'] ?? $out['dark_logo'] ?? $out['darklogo'] ?? $out['logo'] ?? null;

        return $out;
    }

    private function allValuesNull(array $data): bool
    {
        foreach ($data as $k => $v) {
            if ($k === '_meta') {
                continue;
            }
            if ($v !== null && $v !== '' && $v !== []) {
                return false;
            }
        }
        return true;
    }

    /**
     * Contact: contact_infos dizisini email, phone, address vb. alanlara dönüştürür
     * API formatı: contact_infos[{ email, phone, mobile, website, address, city, district, country, map, is_primary }]
     */
    private function normalizeContact(array $data): array
    {
        $out = $data;
        $infos = $data['contact_infos'] ?? [];

        if (!is_array($infos) || empty($infos)) {
            return $out;
        }

        $primary = null;
        foreach ($infos as $info) {
            if (!is_array($info)) {
                continue;
            }
            if ($info['is_primary'] ?? false) {
                $primary = $info;
                break;
            }
        }
        $contact = $primary ?? $infos[0];

        $addr = trim($contact['address'] ?? '');
        $city = trim($contact['city'] ?? '');
        $country = trim($contact['country'] ?? '');
        $out['address'] = $addr;
        if ($city || $country) {
            $out['address'] .= ($addr ? "\n" : '') . implode(', ', array_filter([$city, $country]));
        }

        $out['email']   = $contact['email'] ?? $contact['mail'] ?? '';
        $out['phone']   = $contact['phone'] ?? $contact['tel'] ?? $contact['mobile'] ?? '';
        $out['mobile']  = $contact['mobile'] ?? $contact['phone'] ?? '';
        $out['website'] = $contact['website'] ?? $contact['url'] ?? '';
        $out['map']     = $contact['map'] ?? '';

        $out['contact_infos'] = $infos;

        return $out;
    }

    private function normalize(array $data): array
    {
        $out = [];
        foreach ($data as $k => $v) {
            if ($k === '_meta') {
                $out[$k] = $v;
                continue;
            }
            if (is_array($v) && isset($v['url'])) {
                $out[$k] = $this->resolveMediaUrl($v);
            } else {
                $out[$k] = $v;
            }
        }
        return $out;
    }

    private function fetch(string $key, string $locale = 'de'): array
    {
        $base     = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant   = config('omr.main_tenant') ?: config('omr.tenant_id');

        if (!$tenant || !$base) {
            Log::debug('Settings API: missing config', ['key' => $key]);
            return [];
        }

        $url = "{$base}{$endpoint}/settings/{$key}";

        try {
            $response = Http::timeout(config('omr.timeout', 10))
                ->withHeaders([
                    'X-Tenant-ID' => $tenant,
                    'Accept-Language' => $locale,
                ])
                ->get($url, [
                    'locale' => $locale,
                    'lang'   => $locale,
                ]);

            if (!$response->successful()) {
                Log::debug('Settings API failed', [
                    'key'    => $key,
                    'status' => $response->status(),
                ]);
                return [];
            }

            $json = $response->json();
            $data = $json['data'] ?? $json;

            if (is_array($data) && isset($data['attributes'])) {
                $data = array_merge($data, $data['attributes'] ?? []);
            }

            $result = is_array($data) ? $data : [];

            // Tüm değerler null ise default locale ile tekrar dene
            if ($result && $this->allValuesNull($result) && $locale !== 'en') {
                $fallback = $this->fetch($key, 'en');
                if ($fallback && !$this->allValuesNull($fallback)) {
                    return $fallback;
                }
            }

            return $result;
        } catch (\Throwable $e) {
            Log::debug('Settings API error', [
                'key'   => $key,
                'error' => $e->getMessage(),
            ]);
            return [];
        }
    }
}
