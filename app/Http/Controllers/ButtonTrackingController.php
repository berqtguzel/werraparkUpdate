<?php

namespace App\Http\Controllers;

use App\Services\ButtonTrackingService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ButtonTrackingController extends Controller
{
    public function __construct(
        private ButtonTrackingService $tracking,
    ) {}

    public function track(Request $request): JsonResponse
    {
        $payload = [
            'button_id' => $request->input('button_id'),
            'button_label' => $request->input('button_label'),
            'button_name' => $request->input('button_name'),
            'page' => $request->input('page'),
            'metadata' => $request->input('metadata', []),
        ];

        $payload = array_filter($payload, fn ($v) => $v !== null && $v !== '');

        $ok = $this->tracking->track($payload);

        return response()->json(['success' => $ok]);
    }
}
