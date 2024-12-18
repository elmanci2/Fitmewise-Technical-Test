import React from "react";
import { motion } from "framer-motion";

interface WeatherInfoProps {
  weather: {
    city: string;
    date: string;
    weather: string;
    temperature: string;
  };
  onBackToSearch: () => void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weather,
  onBackToSearch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-lg mb-2"
      >
        Weather Details
      </motion.h4>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {Object.entries(weather).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            className="flex justify-between"
          >
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span>{value}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <button
          onClick={onBackToSearch}
          className="w-full p-2 mt-4 bg-white/20 hover:bg-white/30 text-white rounded transition duration-300"
        >
          New search
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WeatherInfo;
