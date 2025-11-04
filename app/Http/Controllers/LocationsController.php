<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationsController extends Controller
{
    public function index()
    {
        return Inertia::render('Locations');
    }
}
