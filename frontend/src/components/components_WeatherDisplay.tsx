import React from "react";
import { motion } from "framer-motion";

interface WeatherDisplayProps {
  location: string;
  weather: {
    city: string;
    date: string;
    weather: string;
    temperature: string;
  };
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  location,
  weather,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-6 lg:p-10 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent"
    >
      <div className="mt-auto">
        <motion.h1
          key={weather.temperature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl lg:text-9xl font-bold text-white"
        >
          {weather.temperature} {" "}
        </motion.h1>
        <motion.h2
          key={location}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl lg:text-4xl mt-2 text-white"
        >
          {location}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg lg:text-xl mt-1 text-white"
        >
          {weather.date}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center mt-2"
        >
          <span className="text-white text-2xl">{weather.weather}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
