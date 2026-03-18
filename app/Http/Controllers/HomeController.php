<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __construct(
        private ApiHealthService $apiHealth,
    ) {}

    public function index(string $locale = 'de')
    {
        $rooms = $this->apiHealth->isAvailable()
            ? $this->fetchRooms($locale)
            : [];

        return Inertia::render('Home/Index', [
            'currentRoute' => 'home',
            'locale' => $locale,
            'rooms' => $rooms,
        ]);
    }

    private function fetchRooms(string $locale): array
    {
        try {
            $url = config('omr.base_url') . config('omr.endpoint') . 'rooms';

            $response = Http::timeout(config('omr.timeout'))
                ->withHeaders([
                    'X-Tenant-ID' => config('omr.tenant_id')
                ])
                ->get($url, [
                    'lang' => $locale,
                ]);

            if ($response->successful()) {
                $json = $response->json();
                return $json['data'] ?? [];
            }
        } catch (\Throwable $e) {
            //
        }

        return [];
    }
}
