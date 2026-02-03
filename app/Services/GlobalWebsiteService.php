<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GlobalWebsiteService
{
    public function getWebsites(string $locale): array
    {
        $base   = rtrim(config('omr.api_base'), '/');
        $tenant = config('omr.main_tenant') ?: config('omr.tenant_id');

        if (!$tenant) {
            Log::error('OMR_TENANT_ID missing');
            return [];
        }

        $locale = strtolower($locale);
        $cacheKey = "global_websites:{$tenant}:{$locale}";

        return Cache::remember($cacheKey, now()->addHours(6), function () use ($base, $tenant, $locale) {
            try {
                $response = Http::timeout(10)
                    ->withHeaders(['X-Tenant-ID' => $tenant])
                    ->get("{$base}/v1/websites", [
                        'tenant' => $tenant,
                        'locale' => $locale,
                    ]);

                if (!$response->successful()) {
                    Log::warning('Websites API failed', [
                        'status' => $response->status(),
                        'tenant' => $tenant,
                        'locale' => $locale,
                    ]);
                    return [];
                }

                $data = $response->json('data');
                return is_array($data) ? $data : [];

            } catch (\Throwable $e) {
                Log::error('Error fetching websites', [
                    'tenant' => $tenant,
                    'locale' => $locale,
                    'error'  => $e->getMessage(),
                ]);
                return [];
            }
        });
    }
}
