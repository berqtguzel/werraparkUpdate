<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RoomPageController extends Controller
{
    public function __construct(
        private ApiHealthService $apiHealth,
    ) {}

    public function show(string $locale, string $room)
    {
        $roomData = null;
        $error = false;

        if ($this->apiHealth->isAvailable()) {
            try {
                $url = config('omr.base_url') . config('omr.endpoint') . 'rooms/' . $room;

                $response = Http::timeout(config('omr.timeout'))
                    ->withHeaders([
                        'X-Tenant-ID' => config('omr.tenant_id')
                    ])
                    ->get($url, [
                        'lang' => $locale,
                    ]);

                if ($response->successful()) {
                    $json = $response->json();
                    $roomData = $json['data'] ?? null;
                }
            } catch (\Throwable $e) {
                $error = true;
            }
        }

        return Inertia::render('Rooms/Show', [
            'locale' => $locale,
            'roomSlug' => $room,
            'room' => $roomData,
            'error' => $error,
        ]);
    }
}
