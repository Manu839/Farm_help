import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWater, FaCloudRain, FaThermometerHalf, FaTint, FaSync, FaLeaf, FaExclamationTriangle } from 'react-icons/fa';

const Irrigation = () => {
  const [averagePrecipitation, setAveragePrecipitation] = useState(null);
  const [irrigationRecommendation, setIrrigationRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const calculateIrrigationNeeds = (precipitation) => {
    const optimalWaterPerDay = 6;
    const weeklyOptimal = optimalWaterPerDay * 7;
    const actualWater = precipitation * 7;
    const waterDifference = weeklyOptimal - actualWater;

    return {
      recommended: Math.max(0, waterDifference).toFixed(1),
      status: waterDifference > 0 ? 'increase' : waterDifference < -2 ? 'decrease' : 'maintain',
      deficit: waterDifference.toFixed(1)
    };
  };

  const fetchData = async (lat, lon) => {
    if (!lat || !lon) return setError('Location not available'), setLoading(false);

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);

      const formatDate = (d) => d.toISOString().split('T')[0].replace(/-/g, '');
      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?start=${formatDate(startDate)}&end=${formatDate(endDate)}&latitude=${lat}&longitude=${lon}&community=RE&parameters=PRECTOTCORR&format=JSON`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      const rain = data.properties?.parameter?.PRECTOTCORR;
      if (!rain) throw new Error('Invalid data format');

      const values = Object.values(rain).filter((v) => v >= 0);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;

      setAveragePrecipitation(avg);
      setIrrigationRecommendation(calculateIrrigationNeeds(avg));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchData(latitude, longitude);
      },
      (err) => setError('Geolocation error: ' + err.message)
    );
  }, []);

  const getStatusInfo = () => {
    const status = irrigationRecommendation?.status;
    if (status === 'increase') return {
      label: 'Increase Irrigation',
      color: 'from-red-500 to-orange-600',
      icon: FaExclamationTriangle,
      message: 'Your crops need more water. Increase irrigation to prevent stress.',
      bgColor: 'from-red-50 to-orange-50'
    };
    if (status === 'decrease') return {
      label: 'Reduce Irrigation',
      color: 'from-blue-500 to-cyan-600',
      icon: FaTint,
      message: 'Soil moisture is adequate. Consider reducing irrigation to save water.',
      bgColor: 'from-blue-50 to-cyan-50'
    };
    return {
      label: 'Maintain Current Irrigation',
      color: 'from-green-500 to-emerald-600',
      icon: FaLeaf,
      message: 'Perfect! Your current irrigation schedule is optimal.',
      bgColor: 'from-green-50 to-emerald-50'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
              <FaWater className="absolute inset-0 m-auto text-green-500 text-2xl animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Analyzing Irrigation Needs</h2>
            <p className="text-gray-600">Fetching weather data and calculating optimal water requirements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center shadow-xl">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-red-700 mb-4">Unable to Load Data</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl transition-colors duration-300"
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <FaWater className="text-5xl text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Smart <span className="text-blue-600">Irrigation</span> System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Precision water management based on real-time weather data and soil conditions 
            to optimize crop health and conserve water resources.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${statusInfo.bgColor} rounded-3xl p-8 shadow-2xl border border-green-100 mb-8`}
          >
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${statusInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <statusInfo.icon className="text-white text-3xl" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{statusInfo.label}</h2>
              
              <div className="text-5xl font-bold text-blue-600 mb-4">
                {irrigationRecommendation?.recommended} L/m²
              </div>
              
              <p className="text-lg text-gray-600 mb-6">
                Recommended additional water for this week
              </p>
              
              <div className="bg-white/70 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-gray-700 font-medium">{statusInfo.message}</p>
              </div>
            </div>
          </motion.div>

          {/* Data Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Weather Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                  <FaCloudRain className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Weather Data</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Rainfall:</span>
                  <span className="font-semibold text-blue-600">
                    {(averagePrecipitation * 7).toFixed(1)} mm
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Average:</span>
                  <span className="font-semibold text-gray-800">
                    {averagePrecipitation.toFixed(1)} mm
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Soil Condition:</span>
                  <span className={`font-semibold ${
                    irrigationRecommendation?.deficit > 2 ? 'text-red-600' :
                    irrigationRecommendation?.deficit < -2 ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {irrigationRecommendation?.deficit > 2 ? "Dry" :
                     irrigationRecommendation?.deficit < -2 ? "Wet" : "Balanced"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Today's Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Today's Action</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  {irrigationRecommendation?.status === 'increase'
                    ? '🚨 Add extra water to prevent crop stress and maintain healthy growth.'
                    : irrigationRecommendation?.status === 'decrease'
                    ? '💧 Skip today\'s watering or reduce irrigation time to conserve water.'
                    : '✅ Continue with your regular watering schedule - conditions are optimal.'}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm text-gray-600">
                    <strong>Tip:</strong> Check soil moisture 2-3 inches deep before watering
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <FaSync className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Controls</h3>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fetchData(latitude, longitude)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300"
                >
                  <FaSync className="inline mr-2" />
                  Refresh Data
                </motion.button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">💡 Smart Irrigation Tips</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Best Time", tip: "Water early morning (6-8 AM) to reduce evaporation" },
                { title: "Soil Check", tip: "Insert finger 2-3 inches deep to test moisture" },
                { title: "Mulching", tip: "Use organic mulch to retain soil moisture longer" },
                { title: "Efficiency", tip: "Drip irrigation saves 30-50% more water than sprinklers" }
              ].map((item, index) => (
                <div key={index} className="bg-white/20 rounded-2xl p-4 text-center">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm opacity-90">{item.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;