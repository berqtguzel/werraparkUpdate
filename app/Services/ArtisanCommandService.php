<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ArtisanCommandService
{
    private const CACHE_KEY = 'omr_artisan_commands';
    private const CACHE_TTL = 300;

    public function getCommands(): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, fn () => $this->fetchCommands());
    }

    public function fetchCommands(): array
    {
        $base = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant = config('omr.tenant_id');

        if (!$tenant || !$base) {
            return ['success' => false, 'commands' => [], 'grouped' => [], 'categories' => []];
        }

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->get("{$base}{$endpoint}/artisan/commands");

            if ($response->successful()) {
                $json = $response->json();
                return [
                    'success' => $json['success'] ?? true,
                    'commands' => $json['commands'] ?? [],
                    'grouped' => $json['grouped'] ?? [],
                    'categories' => $json['categories'] ?? [],
                ];
            }

            return [
                'success' => false,
                'commands' => [],
                'grouped' => [],
                'categories' => [],
            ];
        } catch (\Throwable $e) {
            Log::warning('Artisan commands API failed', ['error' => $e->getMessage()]);
            return [
                'success' => false,
                'commands' => [],
                'grouped' => [],
                'categories' => [],
            ];
        }
    }

    public function runCommand(string $command): array
    {
        $base = rtrim(config('omr.base_url'), '/');
        $endpoint = rtrim(config('omr.endpoint'), '/');
        $tenant = config('omr.tenant_id');

        if (!$tenant || !$base) {
            return ['success' => false, 'message' => 'API config missing'];
        }

        try {
            $response = Http::timeout(30)
                ->withHeaders(['X-Tenant-ID' => $tenant])
                ->post("{$base}{$endpoint}/artisan/commands/run", [
                    'command' => $command,
                ]);

            $json = $response->json();
            return [
                'success' => $json['success'] ?? $response->successful(),
                'message' => $json['message'] ?? ($response->successful() ? 'OK' : 'Failed'),
                'output' => $json['output'] ?? null,
            ];
        } catch (\Throwable $e) {
            Log::error('Artisan command run failed', ['command' => $command, 'error' => $e->getMessage()]);
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'output' => null,
            ];
        }
    }

    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
