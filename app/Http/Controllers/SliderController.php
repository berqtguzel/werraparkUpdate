<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
class SliderController extends Controller
{
    public function getSliders(string $locale, string $slug)
    {
        $base       = rtrim(config('omr.api_base'), '/');
        $tenant     = config('omr.tenant_id');
        $mainTenant = config('omr.main_tenant') ?: $tenant;

        $locale = strtolower($locale);
        $slug   = strtolower($slug);

        if (!$tenant) {
            abort(500, 'OMR_TENANT_ID missing');
        }

        $cacheKey = "slider_show:{$mainTenant}:{$locale}:{$slug}";

        $sliderData = Cache::remember($cacheKey, now()->addHours(1), function () use (
            $base,
            $mainTenant,
            $locale,
            $slug,
            $tenant
        ) {
            try {
                $response = Http::timeout(10)
                    ->withHeaders([
                        'X-Tenant-ID' => $mainTenant,
                    ])
                    ->get("{$base}/v1/sliders/{$slug}", [
                        'tenant' => $mainTenant,
                        'locale' => $locale,
                    ]);

                if (!$response->successful()) {
                    Log::warning('Slider API failed', [
                        'slug'   => $slug,
                        'status' => $response->status(),
                        'tenant' => $tenant,
                        'locale' => $locale,
                    ]);
                    return null;
                }

                $data = $response->json('data');

                return is_array($data) ? $data : null;

            } catch (\Throwable $e) {
                Log::error('Error fetching slider data', [
                    'slug'   => $slug,
                    'error'  => $e->getMessage(),
                    'tenant' => $tenant,
                    'locale' => $locale,
                ]);
                return null;
            }
        });

        if (!$sliderData) {
            abort(404, 'Slider not found');
        }

        return response()->json(['data' => $sliderData]);
    }
}
