<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class GlobalWebsiteController extends Controller
{
    public static function fetchGlobalWebsites(): array
    {
        $cacheKey = 'global_websites_data';
        $cachedData = Cache::get($cacheKey);

        if ($cachedData) {
            return $cachedData;
        }

        try {
            $response = Http::timeout(5)->get('https://omerdogan.de/api/global/websites');

            if ($response->successful()) {
                $data = $response->json();

                Cache::put($cacheKey, $data, now()->addHours(6));

                return $data;
            } else {
                Log::error('Failed to fetch global websites: ' . $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Exception while fetching global websites: ' . $e->getMessage());
        }

        return [];
    }
}
