<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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
            $cacheKey = 'room_show:' . strtolower($locale) . ':' . strtolower($room);

            $cached = Cache::remember($cacheKey, now()->addDays(7), function () use ($locale, $room) {
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

                        return [
                            'room' => $json['data'] ?? null,
                            'error' => false,
                        ];
                    }
                } catch (\Throwable $e) {
                    return [
                        'room' => null,
                        'error' => true,
                    ];
                }

                return [
                    'room' => null,
                    'error' => false,
                ];
            });

            $roomData = $cached['room'] ?? null;
            $error = (bool) ($cached['error'] ?? false);
        }

        if (!$roomData && !$error) {
            throw new NotFoundHttpException();
        }

        return Inertia::render('Rooms/Show', [
            'locale' => $locale,
            'roomSlug' => $room,
            'room' => $roomData,
            'error' => $error,
        ]);
    }
}
