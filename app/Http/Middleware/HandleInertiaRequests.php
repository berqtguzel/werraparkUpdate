<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

use App\Services\MenuService;
use App\Services\ApiHealthService;
use App\Services\WidgetService;
use App\Services\SettingsService;
use App\Services\StaffService;
use App\Services\ReviewsService;
use App\Services\ContactFormsService;
use App\Services\SliderService;
use App\Services\HotelService; // 1. Servisi buraya import ettik
use App\Services\HolidayThemeService;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function __construct(
        private MenuService $menuService,
        private ApiHealthService $apiHealthService,
        private WidgetService $widgetService,
        private SettingsService $settingsService,
        private StaffService $staffService,
        private ReviewsService $reviewsService,
        private ContactFormsService $contactFormsService,
        private SliderService $sliderService,
        private HotelService $hotelService, // 2. Constructor'a inject ettik
        private HolidayThemeService $holidayThemeService,
    ) {}

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = $request->route('locale') ?? 'de';
        $health = $this->apiHealthService->check();
        $apiUp = $health['success'] ?? false;
        $holidayThemes = $apiUp ? $this->holidayThemeService->getThemes($locale) : [];
        $themeGroups = $this->holidayThemeService->splitThemesByFile($holidayThemes);

        return array_merge(parent::share($request), [
            'flash' => [
                'commandResult' => $request->session()->get('commandResult'),
                'success'       => $request->session()->get('success'),
            ],

            'global' => [
                'locale'    => $locale,
                'menu'      => $apiUp ? $this->menuService->getMenu($locale) : [],
                'hotels'    => $apiUp ? $this->hotelService->getHotels() : [],
                'holidayThemes' => $holidayThemes,
                'offerThemes' => $themeGroups['offers'],
                'travelThemes' => $themeGroups['travelThemes'],
                'widgets'   => $apiUp ? $this->widgetService->getWidgets($locale) : [
                    'ratings' => [],
                    'whatsapp' => [],
                    'serviceHighlights' => [],
                ],
                'settings'  => $apiUp ? $this->settingsService->getForFrontend($locale) : [
                    'general'     => [],
                    'contact'     => [],
                    'social'      => [],
                    'branding'    => [],
                    'colors'      => [],
                    'footer'      => [],
                    'seo'         => [],
                    'analytics'   => [],
                    'custom_code' => [],
                ],
                'staff'        => $apiUp ? $this->staffService->getStaff($locale) : [],
                'reviews'      => $apiUp ? $this->reviewsService->getReviews($locale) : [],
                'contactForms' => $apiUp ? $this->contactFormsService->getContactForms($locale) : [],
                'slider'       => $apiUp ? $this->sliderService->getSlider(config('omr.hero_slider_slug', 'hero'), $locale) : null,
            ],

            'ziggy' => fn() => array_merge(
                (new Ziggy)->toArray(),
                ['location' => $request->url()]
            ),
        ]);
    }
}
