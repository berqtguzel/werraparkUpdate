<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use App\Services\ArtisanCommandService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ArtisanCommandController extends Controller
{
    public function __construct(
        private ArtisanCommandService $artisanService,
        private ApiHealthService $apiHealth,
    ) {}

    public function index(string $locale = 'de')
    {
        $locale = strtolower($locale);
        $cacheKey = "artisan_commands_page:{$locale}";

        $data = Cache::remember($cacheKey, now()->addDays(7), function () {
            return $this->apiHealth->isAvailable()
                ? $this->artisanService->getCommands()
                : ['success' => false, 'commands' => [], 'grouped' => [], 'categories' => []];
        });

        return Inertia::render('Artisan/Index', [
            'locale' => $locale,
            'commands' => $data['commands'] ?? [],
            'grouped' => $data['grouped'] ?? [],
            'categories' => $data['categories'] ?? [],
            'apiAvailable' => $data['success'] ?? false,
        ]);
    }

    public function run(Request $request)
    {
        $command = $request->input('command');
        if (!$command || !is_string($command)) {
            return back()->withErrors(['command' => 'Invalid command']);
        }

        $result = $this->artisanService->runCommand($command);

        if ($result['success']) {
            $this->artisanService->clearCache();
            foreach (['de', 'en', 'tr'] as $locale) {
                Cache::forget("artisan_commands_page:{$locale}");
            }
        }

        return back()->with([
            'commandResult' => $result,
        ]);
    }
}
