<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ContactController;

Route::get('/', fn () => Inertia::render('Home/Index', [
    'currentRoute' => 'home',
]))->name('home');

Route::get('/uber-uns', fn () => Inertia::render('Home/UberUns', [
    'currentRoute' => 'uberuns',
]))->name('uberuns');

Route::get('/kontakt', [ContactController::class, 'index'])->name('contact.index');
Route::post('/kontakt', [ContactController::class, 'store'])->name('contact.store');

// Spezifische Urlaubsthemen-Detailseiten (z.B. /de/urlaubsthemen/wellness)
Route::get('/{locale}/urlaubsthemen/{theme}', function (string $locale, string $theme) {
    return Inertia::render('Themes/Show', [
        'locale' => $locale,
        'theme'  => $theme,
    ]);
})->where([
    'locale' => 'de|en',
])->name('themes.show');

// Fallback ohne Locale → nach /de/urlaubsthemen/{theme} umleiten
Route::get('/urlaubsthemen/{theme}', function (string $theme) {
    return redirect("/de/urlaubsthemen/{$theme}");
});

// Hotels-Detailseiten (z.B. /de/hotels/heubach)
Route::get('/{locale}/hotels/{hotel}', function (string $locale, string $hotel) {
    return Inertia::render('Hotels/Show', [
        'locale' => $locale,
        'hotel'  => $hotel,
    ]);
})->where([
    'locale' => 'de|en',
])->name('hotels.show');

// Fallback ohne Locale → nach /de/hotels/{hotel} umleiten
Route::get('/hotels/{hotel}', function (string $hotel) {
    return redirect("/de/hotels/{$hotel}");
});

// Angebots-Detailseiten (z.B. /de/offers/ai-heubach)
Route::get('/{locale}/offers/{offer}', function (string $locale, string $offer) {
    return Inertia::render('Offers/Show', [
        'locale' => $locale,
        'offer'  => $offer,
    ]);
})->where([
    'locale' => 'de|en',
])->name('offers.show');

// Fallback ohne Locale → nach /de/offers/{offer} umleiten
Route::get('/offers/{offer}', function (string $offer) {
    return redirect("/de/offers/{$offer}");
});

// Geschenkgutschein-Seite
Route::get('/{locale}/gutschein', function (string $locale) {
    return Inertia::render('GiftVoucher/Index', [
        'locale' => $locale,
        'currentRoute' => 'gutschein',
    ]);
})->where([
    'locale' => 'de|en',
])->name('gutschein.index');

Route::get('/gutschein', function () {
    return redirect('/de/gutschein');
});

Route::controller(PageController::class)->group(function () {

    $slugs = [
        'rooms',
        'dining',
        'activities',
        'spa',
        'events',
        'impressum',
        'historie',
        'gaeste-abc',
        'urlaubsthemen',
        'galerie',
        'karriere',
        'bewertungen',
        'veranstaltung',
        'gutscheinshop',
    ];

    // /de/historie gibi
    Route::get('/{locale}/{slug}', 'show')
        ->where([
            'locale' => 'de|en',
            'slug'   => implode('|', $slugs),
        ])
        ->name('page.show');

    // /historie yazılırsa /de/historie'ye yönlendir
    Route::get('/{slug}', function ($slug) {
        return redirect("/de/{$slug}");
    })->whereIn('slug', $slugs);
});
