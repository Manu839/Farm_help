// WeatherCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon";
import { FaTemperatureHigh, FaWind, FaTint } from "react-icons/fa";

const WeatherCard = () => {
  const [weather, setWeather]         = useState(null);
  const [forecast, setForecast]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error,   setError]           = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const key = import.meta.env.VITE_OPENWEATHER_KEY;  
      const params = { lat, lon, units: "metric", appid: key };

      const wRes  = await axios.get("https://api.openweathermap.org/data/2.5/weather",  { params });
      const fRes  = await axios.get("https://api.openweathermap.org/data/2.5/forecast", { params });

      setWeather(wRes.data);
      setForecast(fRes.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ───────────────────────── get location once ───────────────────────── */
  useEffect(() => {
    if (!navigator.geolocation) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
      ()          => { setError("Unable to get location"); setLoading(false); }
    );
  }, []);

  /* ────────────────────────── UI branches ────────────────────────────── */
  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-100 border border-red-200 rounded-xl text-red-700 text-center">
        {error}
      </div>
    );

  /* ─────────────────────────── main card ─────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6  bg-white rounded-2xl shadow-lg border border-gray-200"
    >
      {/* current weather */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-green-700">{weather.name}</h2>
          <p className="text-4xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-gray-500">{weather.weather[0].description}</p>
        </div>

        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
          <WeatherIcon weather={weather.weather[0]} size="text-6xl text-green-500" />
        </motion.div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: FaTemperatureHigh, label: "Feels like", val: `${Math.round(weather.main.feels_like)}°C` },
          { icon: FaTint,            label: "Humidity",  val: `${weather.main.humidity}%` },
          { icon: FaWind,            label: "Wind",      val: `${weather.wind.speed} m/s` }
        ].map(({ icon: Icon, label, val }) => (
          <div key={label} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <Icon className="text-green-500 text-xl mb-1" />
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-gray-800">{val}</p>
          </div>
        ))}
      </div>

      {/* forecast */}
      <h3 className="text-lg font-semibold text-green-700 mb-3">Next hours</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {forecast.list.slice(0, 6).map((item) => (
          <div
            key={item.dt}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm text-sm"
          >
            <WeatherIcon weather={item.weather[0]} size="text-2xl text-green-500" />
            <div className="text-right">
              <p className="font-medium text-gray-800">{Math.round(item.main.temp)}°C</p>
              <p className="text-gray-500">
                {new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherCard;
