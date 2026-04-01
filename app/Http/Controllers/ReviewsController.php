<?php

namespace App\Http\Controllers;

use App\Services\ReviewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function index(string $locale, ReviewsService $service): JsonResponse
    {
        return response()->json([
            'data' => $service->getReviews($locale)
        ]);
    }

public function store(Request $request, ReviewsService $service): JsonResponse
{
    $validated = $request->validate([
        'author_name'  => ['required', 'string', 'max:255'],
        'author_email' => ['required', 'email'],
        'content'      => ['required', 'string'],
        'rating'       => ['required', 'integer', 'min:1', 'max:5'],
    ]);

    // Servise gönderiyoruz, servis 'stay_date'i kendi ekleyecek.
    $result = $service->createReview($validated);

    if (isset($result['error'])) {
        return response()->json([
            'message' => 'Hata oluştu: ' . $result['error'],
            'debug'   => $result['details'] ?? null
        ], 422);
    }

    return response()->json([
    'success' => true,
    'message' => 'Review submitted successfully. It will be published after approval.',
    'data'    => $result['data'] ?? $result
]);
}
}
