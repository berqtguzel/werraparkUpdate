<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CouponController extends Controller
{
    public static function fetchCoupons(): array
    {
        $mainTenant = env("OMR_MAIN_TENANT", null);
        $cacheKey = 'coupons:' . ($mainTenant ?: 'default');

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($mainTenant) {
            try {
                $tenantParam = $mainTenant ? '?tenant=' . $mainTenant : '';

                $response = Http::timeout(5)
                    ->get('https://omerdogan.de/api/v1/coupons' . $tenantParam);

                if ($response->successful()) {
                    $json = $response->json();
                    return $json['data']['coupons'] ?? [];
                }

            } catch (\Exception $e) {

            }

            return [];
        });
    }

    public static function fetchCouponById(int $id): array
    {
        $mainTenant = env("OMR_MAIN_TENANT", null);
        $cacheKey = 'coupon:' . ($mainTenant ?: 'default') . ':' . $id;

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($mainTenant, $id) {
            try {
                $tenantParam = $mainTenant ? '?tenant=' . $mainTenant : '';

                $response = Http::timeout(5)
                    ->get("https://omerdogan.de/api/v1/coupons/{$id}" . $tenantParam);

                if ($response->successful()) {
                    $json = $response->json();
                    return $json['data'] ?? [];
                }

            } catch (\Exception $e) {

            }

            return [];
        });
    }
}
