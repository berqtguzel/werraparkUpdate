<?php

namespace App\Http\Controllers;

use App\Services\ApiHealthService;
use App\Services\ArtisanCommandService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtisanCommandController extends Controller
{
    public function __construct(
        private ArtisanCommandService $artisanService,
        private ApiHealthService $apiHealth,
    ) {}

    public function index(string $locale = 'de')
    {
        $data = $this->apiHealth->isAvailable()
            ? $this->artisanService->getCommands()
            : ['success' => false, 'commands' => [], 'grouped' => [], 'categories' => []];

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
        }

        return back()->with([
            'commandResult' => $result,
        ]);
    }
}
