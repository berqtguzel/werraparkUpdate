<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ReviewsService
{
    private const CACHE_KEY_PREFIX = 'omr_reviews_';
    private const CACHE_TTL = 600;

    public function getReviews(string $locale): array
    {
        $locale = strtolower($locale);
        $cacheKey = self::CACHE_KEY_PREFIX . $locale;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($locale) {
            return $this->fetch($locale);
        });
    }

    public function clearCache(): void
    {
        foreach (['de', 'en', 'tr'] as $locale) {
            Cache::forget(self::CACHE_KEY_PREFIX . $locale);
        }
    }

    private function fetch(string $locale): array
    {
        $base     = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant   = config('omr.main_tenant') ?: config('omr.tenant_id');

        if (!$tenant || !$base) {
            return [];
        }

        $url = "{$base}{$endpoint}/reviews";

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->get($url, [
                    'locale' => $locale,
                    'lang'   => $locale,
                ]);

            if (!$response->successful()) {
                Log::debug('Reviews API failed', ['status' => $response->status()]);
                return [];
            }

            $json = $response->json();
            $data = $json['data'] ?? $json;

            if (is_array($data) && isset($data['items'])) {
                $data = $data['items'];
            }
            if (!is_array($data)) {
                return [];
            }

            return $this->normalizeReviews($data, $locale);
        } catch (\Throwable $e) {
            Log::debug('Reviews API error', ['error' => $e->getMessage()]);
            return [];
        }
    }

    private function normalizeReviews(array $data, string $locale = 'de'): array
    {
        $out = [];

        foreach ($data as $item) {
            if (!is_array($item)) {
                continue;
            }
            $attrs = $item['attributes'] ?? $item;

            $status = $attrs['status'] ?? null;
            if ($status && $status !== 'approved') {
                continue;
            }

            $ratingRaw = $attrs['rating'] ?? $attrs['stars'] ?? 5;
            $rating = is_numeric($ratingRaw)
                ? (float) $ratingRaw
                : 5.0;
            if ($rating > 5) {
                $rating = round($rating / 2, 1);
            }
            $rating = max(1, min(5, (int) round($rating)));

            $stayDate = $attrs['stay_date'] ?? $attrs['stay'] ?? $attrs['period'] ?? null;
            $stayFormatted = $stayDate
                ? $this->formatStayDate($stayDate, $locale)
                : '';

            $out[] = [
                'id'       => $attrs['id'] ?? uniqid('r'),
                'name'     => $attrs['author_name'] ?? $attrs['name'] ?? $attrs['author'] ?? $attrs['guest_name'] ?? '',
                'location' => $attrs['location'] ?? $attrs['city'] ?? '',
                'rating'   => $rating,
                'text'     => $attrs['content'] ?? $attrs['text'] ?? $attrs['review'] ?? $attrs['comment'] ?? '',
                'stay'     => $stayFormatted,
            ];
        }

        return $out;
    }

    private function formatStayDate(string $date, string $locale): string
    {
        try {
            $dt = new \DateTimeImmutable($date);
            $formatter = new \IntlDateFormatter(
                $locale === 'de' ? 'de_DE' : ($locale === 'tr' ? 'tr_TR' : 'en_US'),
                \IntlDateFormatter::MEDIUM,
                \IntlDateFormatter::NONE,
                null,
                \IntlDateFormatter::GREGORIAN,
                'MMMM yyyy'
            );
            return $formatter->format($dt);
        } catch (\Throwable $e) {
            return $date;
        }
    }
}
