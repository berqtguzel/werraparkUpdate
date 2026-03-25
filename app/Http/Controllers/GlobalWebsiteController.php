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
        return Cache::remember($cacheKey, now()->addDays(7), function () {
            try {
                $response = Http::timeout(5)->get('https://omerdogan.de/api/');

                if ($response->successful()) {
                    return $response->json();
                } else {
                    Log::error('Failed to fetch global websites: ' . $response->status());
                }
            } catch (\Exception $e) {
                Log::error('Exception while fetching global websites: ' . $e->getMessage());
            }

            return [];
        });
    }
}
