<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Index', [
            'hero' => [
                'title' => 'Willkommen im Werrapark',
                'subtitle' => 'Hotel · Spa · Natur – Entspannung im Thüringer Wald',
                'image' => '/images/hero/home.jpg',
                'cta' => ['label' => 'Jetzt buchen', 'href' => '/offers'],
            ],
            'highlights' => [
                ['title' => 'Panorama Spa', 'desc' => 'Sauna, Pool & Wellness', 'image' => '/images/spa/cover.jpg'],
                ['title' => 'Zimmer & Suiten', 'desc' => 'Komfort & Naturblick', 'image' => '/images/rooms/cover.jpg'],
                ['title' => 'Aktivitäten', 'desc' => 'Wandern & Wintersport', 'image' => '/images/events/cover.jpg'],
            ],
            'currentRoute' => 'home',
        ]);
    }
}
