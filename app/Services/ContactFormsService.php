<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactFormsService
{
    private const CACHE_KEY_PREFIX = 'omr_contact_forms_';
    private const CACHE_TTL = 600;

    public function getContactForms(string $locale): array
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

        $url = "{$base}{$endpoint}/contact/forms";

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->get($url, [
                    'locale' => $locale,
                    'lang'   => $locale,
                ]);

            if (!$response->successful()) {
                Log::debug('Contact forms API failed', ['status' => $response->status()]);
                return [];
            }

            $json = $response->json();
            $data = $json['data'] ?? $json;

            if (!is_array($data)) {
                return [];
            }

            return $this->normalize($data, $base);
        } catch (\Throwable $e) {
            Log::debug('Contact forms API error', ['error' => $e->getMessage()]);
            return [];
        }
    }

    private function normalize(array $data, string $base): array
    {
        $out = [
            'executives'   => [],
            'reservations' => [],
            'contactInfo'  => [
                'address' => '',
                'phone'   => '',
                'email'   => '',
            ],
            'formFields'   => [],
        ];

        $forms = $data['forms'] ?? $data['items'] ?? $data;
        if (isset($forms['forms'])) {
            $forms = $forms['forms'];
        }
        if (!is_array($forms)) {
            $forms = [];
        }

        foreach ($forms as $form) {
            if (!is_array($form)) {
                continue;
            }
            $attrs = $form['attributes'] ?? $form;
            $type  = strtolower($attrs['type'] ?? $attrs['slug'] ?? $attrs['id'] ?? 'general');

            $people = $attrs['people'] ?? $attrs['contacts'] ?? $attrs['items'] ?? [$form];

            if ($type === 'executives' || $type === 'executive') {
                $out['executives'] = array_merge(
                    $out['executives'],
                    $this->normalizePeople($people, $base)
                );
            } elseif ($type === 'reservations' || $type === 'reservation') {
                $out['reservations'] = array_merge(
                    $out['reservations'],
                    $this->normalizePeople($people, $base)
                );
            } elseif (isset($attrs['fields'])) {
                $out['formFields'] = array_merge($out['formFields'], $this->normalizeFields($attrs['fields']));
            }
        }

        if (isset($data['contactInfo']) && is_array($data['contactInfo'])) {
            $ci = $data['contactInfo'];
            $out['contactInfo'] = [
                'address' => $ci['address'] ?? $ci['street'] ?? '',
                'phone'   => $ci['phone'] ?? $ci['tel'] ?? '',
                'email'   => $ci['email'] ?? $ci['mail'] ?? '',
            ];
        }

        if (isset($data['executives']) && is_array($data['executives'])) {
            $out['executives'] = $this->normalizePeople($data['executives'], $base);
        }
        if (isset($data['reservations']) && is_array($data['reservations'])) {
            $out['reservations'] = $this->normalizePeople($data['reservations'], $base);
        }

        return $out;
    }

    private function normalizePeople(array $items, string $base): array
    {
        $out = [];

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }
            $attrs = $item['attributes'] ?? $item;
            $img   = $attrs['image'] ?? $attrs['photo'] ?? $attrs['avatar'] ?? null;

            if (is_array($img)) {
                $img = $img['url'] ?? $img['data']['attributes']['url'] ?? null;
            }
            if ($img && !str_starts_with($img, 'http')) {
                $img = $base . (str_starts_with($img, '/') ? '' : '/') . $img;
            }

            $out[] = [
                'photo'  => $img ?: '/images/teams/sezaikoc.png',
                'name'   => $attrs['name'] ?? $attrs['title'] ?? '',
                'title'  => $attrs['title'] ?? $attrs['position'] ?? $attrs['role'] ?? '',
                'email'  => $attrs['email'] ?? $attrs['mail'] ?? '',
                'phone'  => $attrs['phone'] ?? $attrs['tel'] ?? $attrs['telephone'] ?? $attrs['mobile'] ?? '',
            ];
        }

        return $out;
    }

    private function normalizeFields(array $fields): array
    {
        $out = [];

        foreach ($fields as $f) {
            if (!is_array($f)) {
                continue;
            }
            $out[] = [
                'name'        => $f['name'] ?? $f['key'] ?? '',
                'type'        => $f['type'] ?? 'text',
                'label'       => $f['label'] ?? $f['placeholder'] ?? '',
                'placeholder' => $f['placeholder'] ?? '',
                'required'    => $f['required'] ?? false,
            ];
        }

        return $out;
    }
}
