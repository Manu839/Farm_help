import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTemperatureHigh, FaWind, FaTint, FaMapMarkerAlt, FaSync } from "react-icons/fa";
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

// Weather Icon Component (integrated)
const weatherIcons = {
  '01d': <WiDaySunny />,
  '01n': <WiNightClear />,
  '02d': <WiDayCloudy />,
  '02n': <WiNightCloudy />,
  '03d': <WiCloud />,
  '03n': <WiCloud />,
  '04d': <WiCloudy />,
  '04n': <WiCloudy />,
  '09d': <WiShowers />,
  '09n': <WiShowers />,
  '10d': <WiRain />,
  '10n': <WiRain />,
  '11d': <WiThunderstorm />,
  '11n': <WiThunderstorm />,
  '13d': <WiSnow />,
  '13n': <WiSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />,
};

const WeatherIcon = ({ weather, size = 'text-6xl' }) => {
  const icon = weatherIcons[weather.icon] || '❓';
  return (
    <div className={`${size} text-center drop-shadow-lg`}>
      {icon}
    </div>
  );
};

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const key = import.meta.env.VITE_OPENWEATHER_KEY;  
      const params = { lat, lon, units: "metric", appid: key };

      const wRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", { params });
      const fRes = await axios.get("https://api.openweathermap.org/data/2.5/forecast", { params });

      setWeather(wRes.data);
      setForecast(fRes.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
      () => { setError("Unable to get location"); setLoading(false); }
    );
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSync className="text-green-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">Weather Data Unavailable</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather Forecast</h1>
          <p className="text-xl text-gray-600">Real-time weather data for smart farming decisions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Current Weather Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <h2 className="text-2xl font-semibold">{weather.name}</h2>
                  </div>
                  <p className="text-6xl font-bold mb-2">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-xl capitalize opacity-90">{weather.weather[0].description}</p>
                </div>
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="text-8xl"
                >
                  <WeatherIcon weather={weather.weather[0]} size="text-8xl text-white" />
                </motion.div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: FaTemperatureHigh, 
                    label: "Feels Like", 
                    value: `${Math.round(weather.main.feels_like)}°C`,
                    color: "from-orange-400 to-red-500"
                  },
                  { 
                    icon: FaTint, 
                    label: "Humidity", 
                    value: `${weather.main.humidity}%`,
                    color: "from-blue-400 to-cyan-500"
                  },
                  { 
                    icon: FaWind, 
                    label: "Wind Speed", 
                    value: `${weather.wind.speed} m/s`,
                    color: "from-gray-400 to-slate-500"
                  }
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
                    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">📅</span>
              </div>
              24-Hour Forecast
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {forecast.list.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.dt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  
                  <div className="mb-3">
                    <WeatherIcon weather={item.weather[0]} size="text-4xl text-green-500" />
                  </div>
                  
                  <p className="text-xl font-bold text-gray-800 mb-1">
                    {Math.round(item.main.temp)}°C
                  </p>
                  
                  <p className="text-xs text-gray-500 capitalize">
                    {item.weather[0].description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Farming Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 mt-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">🌱 Farming Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Today's Conditions:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Temperature: {weather.main.temp > 25 ? "Warm - ensure adequate irrigation" : "Moderate - good for most crops"}</li>
                  <li>• Humidity: {weather.main.humidity > 70 ? "High - monitor for fungal diseases" : "Normal - favorable conditions"}</li>
                  <li>• Wind: {weather.wind.speed > 5 ? "Windy - secure young plants" : "Calm - ideal for spraying"}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Check soil moisture levels</li>
                  <li>• Monitor crop health for weather stress</li>
                  <li>• Plan irrigation based on forecast</li>
                  <li>• Consider protective measures if needed</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherCard;