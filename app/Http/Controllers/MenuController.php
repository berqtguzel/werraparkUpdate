<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class MenuController extends Controller
{
    public static function fetchMenuData(): array
    {
        $cacheKey = 'menu_data';
        $cachedData = Cache::get($cacheKey);
        $mainTenant = env("OMR_MAIN_TENANT", null);

        if ($cachedData) {
            return $cachedData;
        }


        function getTenantParam($mainTenant) {
            return $mainTenant ? '?tenant=' . $mainTenant : '';
        }
        try {
            $response = Http::timeout(5)->get('https://omerdogan.de/api/v1/menus' . getTenantParam($mainTenant));

            if ($response->successful()) {
                $data = $response->json();
                Cache::put($cacheKey, $data, now()->addHours(6));

                return $data;
            }
        } catch (\Exception $e) {

        }

        return [];
    }
}
