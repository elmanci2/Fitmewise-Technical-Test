import React from "react";
import { motion } from "framer-motion";

interface ForecastDay {
  day: string;
  temp: number;
  condition: string;
}

interface FiveDayForecastProps {
  forecast: ForecastDay[];
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="mt-8"
    >
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="text-lg mb-4"
      >
        5-Day Forecast
      </motion.h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
          >
            <div className="bg-white/20 p-3 rounded text-center">
              <p className="font-semibold">{day.day}</p>
              <p className="text-lg font-bold mt-2">{day.temp}°</p>
              <p className="text-sm">{day.condition}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FiveDayForecast;
