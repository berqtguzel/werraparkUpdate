<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class MenuController extends Controller
{
    public static function fetchMenuData(): array
    {
        $cacheKey = 'menu_data';
        $mainTenant = env("OMR_MAIN_TENANT", null);

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($mainTenant) {
            try {
                $tenantParam = $mainTenant ? '?tenant=' . $mainTenant : '';
                $response = Http::timeout(5)->get('https://omerdogan.de/api/v1/menus' . $tenantParam);

                if ($response->successful()) {
                    return $response->json();
                }
            } catch (\Exception $e) {

            }

            return [];
        });
    }
}
