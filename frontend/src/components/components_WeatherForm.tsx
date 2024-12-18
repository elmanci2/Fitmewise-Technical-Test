import React, { useState } from "react";
import { motion } from "framer-motion";

interface WeatherFormProps {
  onSearch: (city: string, country: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regex = /^[a-zA-Z\s]+ \([A-Za-z]{2,3}\)$/;

    if (regex.test(input)) {
      const [city, country] = input.split("(");
      onSearch(city.trim(), country.replace(")", "").trim());
      setError("");
    } else {
      setError("Please enter the correct format: City (Country)");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="City (Country)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded"
        />
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <button
          type="submit"
          className="w-full p-2 bg-white/20 hover:bg-white/30 text-white rounded transition duration-300"
        >
          Search
        </button>
      </motion.div>
    </motion.form>
  );
};

export default WeatherForm;
