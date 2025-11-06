<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        // Inertia React/Vue sayfanı buraya bağla
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

        // TODO: Mail gönder / DB'ye kaydet
        // Mail::to('info@werrapark.de')->send(new \App\Mail\ContactMail($data));
        // ContactMessage::create($data);

        return back()->with('flash', [
            'type' => 'success',
            'message' => 'Nachricht erfolgreich gesendet.'
        ]);
    }
}
