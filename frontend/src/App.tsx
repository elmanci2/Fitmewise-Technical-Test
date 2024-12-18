import React, { useEffect, useState } from "react";
import FiveDayForecast from "./components/FiveDayForecast";
import WeatherDisplay from "./components/components_WeatherDisplay";
import WeatherInfo from "./components/components_WeatherInfo";
import WeatherForm from "./components/components_WeatherForm";
import Rain from "./assets/videos/rain.mp4";
import Snow from "./assets/videos/Snowy.mp4";
import Sunny from "./assets/videos/Sunny.mp4";
import Cloudy from "./assets/videos/cloudy.mp4";

import {
  fetchForecastData,
  fetchWeatherData,
} from "./storage/reducer/weather/weather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./storage/storage";
import Loader from "./components/loader";

const App: React.FC = () => {
  const [location, setLocation] = useState("London");
  const [showForm, setShowForm] = useState(true);

  const dispatch = useDispatch<any>();

  const { current, forecast, loading } = useSelector(
    (state: RootState) => state.weather
  );
  const handleSearch = (city: string, country: string) => {
    setLocation(`${city}, ${country}`);
    setShowForm(false);
    dispatch(fetchForecastData({ city, country, days: 5 }));
    dispatch(fetchWeatherData({ city, country }));
  };

  const handleVideo = (weatherDescription: string) => {
    const weatherMap: { [key: string]: string } = {
      "clear sky": Sunny,
      "few clouds": Cloudy,
      "scattered clouds": Cloudy,
      "broken clouds": Cloudy,
      "shower rain": Rain,
      rain: Rain,
      thunderstorm: Rain,
      snow: Snow,
      mist: Cloudy,
    };

    const normalizedWeather = weatherDescription.toLowerCase();

    const videoSrc = weatherMap[normalizedWeather] || Rain;

    return <source src={videoSrc} type="video/mp4" />;
  };

  //? load data on mount
  useEffect(() => {
    dispatch(fetchWeatherData({ city: "London", country: "GB" }));
    dispatch(fetchForecastData({ city: "London", country: "GB", days: 5 }));
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        {handleVideo(current?.weather)}
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
      <div className="relative z-20 flex flex-col lg:flex-row h-full min-h-screen">
        <WeatherDisplay location={location} weather={current} />
        <div className="w-full lg:w-1/3 bg-black/30 backdrop-blur-md p-6 lg:p-10 overflow-y-auto text-white">
          {showForm ? (
            <WeatherForm onSearch={handleSearch} />
          ) : (
            <>
              <WeatherInfo
                weather={current}
                onBackToSearch={() => setShowForm(true)}
              />
              <FiveDayForecast forecast={forecast} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
