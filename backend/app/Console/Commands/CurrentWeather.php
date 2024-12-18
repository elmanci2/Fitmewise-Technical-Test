<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class CurrentWeather extends Command
{
    protected $signature = 'current {city} {country} {--units=metric}';
    protected $description = 'Obtener el clima actual de una ciudad.';

    public function handle()
    {
        $city = $this->argument('city');
        $country = $this->argument('country');
        $units = $this->option('units');
        $apiKey = config('services.openweather.key');

     
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => "$city,$country",
            'units' => $units,
            'appid' => $apiKey,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $this->info("Weather in {$data['name']} ({$country}):");
            $this->info("Description: {$data['weather'][0]['description']}");
            $this->info("Temperature: {$data['main']['temp']}°");
        } else {
            $this->error("Error fetching weather data: {$response->status()}");
        }
    }
}
