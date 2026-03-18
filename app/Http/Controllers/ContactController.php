<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function index(string $locale = 'de')
    {
        return Inertia::render('Home/Kontakt', [
            'currentRoute' => 'kontakt',
            'locale' => $locale,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {

            Log::info('Contact form gönderildi', $validated);

            return back()->with('success', 'Mesajınız başarıyla gönderildi.');

        } catch (\Throwable $e) {

            Log::error('Contact form hatası', [
                'error' => $e->getMessage()
            ]);

            return back()->withErrors([
                'error' => 'Bir hata oluştu. Lütfen tekrar deneyin.'
            ]);
        }
    }
}
