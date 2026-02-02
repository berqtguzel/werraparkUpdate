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

/**

 */
Route::controller(PageController::class)->group(function () {
    // temel başlık sayfaları
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

    foreach ($slugs as $slug) {
        Route::get("/{$slug}", 'show')->name("page.{$slug}");
    }
});
