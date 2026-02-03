<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

use App\Services\GlobalWebsiteService;
use App\Services\MenuService;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function __construct(
        private GlobalWebsiteService $globalWebsiteService,
        private MenuService $menuService
    ) {}

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = app()->getLocale();

        return array_merge(parent::share($request), [

            'global' => [
                'tenantId' => config('omr.tenant_id'),
                'locale'   => $locale,
                'websites' => $this->globalWebsiteService->getWebsites($locale),
                'menu'     => $this->menuService->getMenu($locale),
            ],

            'ziggy' => fn () => array_merge(
                (new Ziggy)->toArray(),
                ['location' => $request->url()]
            ),
        ]);
    }
}
