<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function current(Request $request)
    {
        $city = $request->query('city');
        $country = $request->query('country');
        $units = $request->query('units', 'metric'); // Default to metric

        $apiKey = config('services.openweather.key');

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => "$city,$country",
            'units' => $units,
            'appid' => $apiKey,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Error fetching weather data'], 400);
        }

        $data = $response->json();
        return response()->json([
            'city' => "{$data['name']} ({$country})",
            'date' => now()->format('M d Y'),
            'weather' => $data['weather'][0]['description'],
            'temperature' => $data['main']['temp'] . '°' . strtoupper($units[0]),
        ]);
    }

    public function forecast(Request $request)
    {
        $city = $request->query('city');
        $country = $request->query('country');
        $days = $request->query('days', 5);
        $units = $request->query('units', 'metric'); // Default to metric

        $apiKey = config('services.openweather.key');

        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => "$city,$country",
            'units' => $units,
            'appid' => $apiKey,
        ]);
        
        if ($response->failed()) {
            return response()->json(['error' => 'Error fetching weather data'], 400);
        }
        
        $data = $response->json();
        
        // Filtra para mostrar solo un pronóstico por día
        $forecast = collect($data['list'])->groupBy(function ($item) {
            return \Carbon\Carbon::parse($item['dt_txt'])->format('Y-m-d');  // Agrupar por fecha
        })->map(function ($group) {
            // Usar el primer registro de cada grupo (esto elimina las horas)
            return [
                'date' => $group->first()['dt_txt'],
                'weather' => $group->first()['weather'][0]['description'],
                'temperature' => $group->first()['main']['temp'] . '°',
            ];
        })->values();
        
        return response()->json([
            'city' => "{$data['city']['name']} ({$data['city']['country']})",
            'forecast' => $forecast,
        ]);
        
    }
}
