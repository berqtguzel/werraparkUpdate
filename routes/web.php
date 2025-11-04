<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\StaticPageController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/dienstleistungen', [ServicesController::class, 'index'])->name('services.index');
Route::get('/location', [LocationsController::class, 'index'])->name('locations.index');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/{slug}', [StaticPageController::class, 'show'])
     ->where('slug', '[-a-z0-9]+')
     ->name('static.show');
