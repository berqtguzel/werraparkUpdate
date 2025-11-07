<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {

        return Inertia::render('kontakt/Index', [
            'title' => 'Kontakt',
            'subtitle' => 'Wir helfen Ihnen gern weiter.',
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => ['required','string','max:120'],
            'email'   => ['required','email'],
            'phone'   => ['nullable','string','max:40'],
            'message' => ['required','string','max:5000'],
            'privacy' => ['accepted'],
        ]);


        return back()->with('flash', [
            'type' => 'success',
            'message' => 'Nachricht erfolgreich gesendet.'
        ]);
    }
}
