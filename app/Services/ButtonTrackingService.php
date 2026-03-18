<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ButtonTrackingService
{
    public function track(array $payload): bool
    {
        $base = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant = config('omr.tenant_id');

        if (!$tenant || !$base) {
            return false;
        }

        try {
            $response = Http::timeout(5)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->post("{$base}{$endpoint}/button-tracking/track", array_merge([
                    'timestamp' => now()->toIso8601String(),
                    'url' => request()->fullUrl(),
                ], $payload));

            return $response->successful();
        } catch (\Throwable $e) {
            Log::debug('Button tracking failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
