<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ForecastWeather extends Command
{
    protected $signature = 'forecast {city} {country} {--days=3} {--units=metric}';
    protected $description = 'Obtener la previsión meteorológica de una ciudad.';

    public function handle()
    {
        $city = $this->argument('city');
        $country = $this->argument('country');
        $days = min($this->option('days'), 5); 
        $units = $this->option('units');
        $apiKey = config('services.openweather.key'); 

        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => "$city,$country",
            'units' => $units,
            'appid' => $apiKey,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $this->info("Weather Forecast for {$data['city']['name']} ({$country}):");

            foreach (array_slice($data['list'], 0, $days * 8) as $forecast) {
                $date = $forecast['dt_txt'];
                $weather = $forecast['weather'][0]['description'];
                $temp = $forecast['main']['temp'];
                $this->info("$date: $weather ($temp°)");
            }
        } else {
            $this->error("Error fetching weather forecast: {$response->status()}");
        }
    }
}
