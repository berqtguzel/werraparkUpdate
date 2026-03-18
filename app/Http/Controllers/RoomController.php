<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request, string $locale = 'de')
    {
        $url = config('omr.base_url') . config('omr.endpoint') . 'rooms';

        $response = Http::timeout(config('omr.timeout'))
            ->withHeaders([
                'X-Tenant-ID' => config('omr.tenant_id')
            ])
            ->get($url, [
                'lang' => $locale ?? config('omr.locale'),
                'status' => $request->status,
                'min_capacity' => $request->min_capacity,
                'search' => $request->search,
                'per_page' => $request->per_page ?? 10,
            ]);

        $rooms = [];
        $pagination = null;

        if ($response->successful()) {
            $json = $response->json();

            $rooms = $json['data'] ?? [];
            $pagination = $json['pagination'] ?? null;
        }

        return Inertia::render('Rooms/Index', [
            'locale' => $locale,
            'rooms' => $rooms,
            'pagination' => $pagination,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'min_capacity' => $request->min_capacity,
            ]
        ]);
    }
}
