import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWater, FaCloudRain } from 'react-icons/fa';

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

  const getStatusLabel = () => {
    const status = irrigationRecommendation?.status;
    if (status === 'increase') return 'Increase Irrigation';
    if (status === 'decrease') return 'Decrease Irrigation';
    return 'Maintain Current Irrigation';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-12 bg-gray-100"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 text-green-700">Smart Irrigation System</h1>
          <p className="text-xl pt-6 text-gray-700">Precision water management based on real-time data</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-2xl mx-auto text-center border border-red-300">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recommendation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaWater className="text-2xl text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">Irrigation Recommendation</h2>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2 text-green-700">{getStatusLabel()}</h3>
                <p className="text-3xl font-bold text-blue-600">{irrigationRecommendation?.recommended} L/m²</p>
                <p className="text-sm text-gray-600 mt-2">Recommended additional water for the week</p>
              </div>
            </motion.div>

            {/* Guide */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaWater className="text-2xl text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Today's Watering Guide</h2>
              </div>
              <div className="text-gray-700 space-y-2">
                <p>
                  {irrigationRecommendation?.status === 'increase'
                    ? '⚠️ Add more water to prevent crop stress.'
                    : irrigationRecommendation?.status === 'decrease'
                    ? '💧 Consider skipping today’s watering.'
                    : '✅ Maintain regular watering schedule.'}
                </p>
                <p className="text-sm text-gray-500">Based on rainfall and crop needs</p>
              </div>
            </motion.div>

            {/* Weather Summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCloudRain className="text-2xl text-indigo-500" />
                <h2 className="text-xl font-semibold text-gray-800">Weather Update</h2>
              </div>
              <div className="text-gray-700 space-y-2">
                <p>
                  🌧️ <strong>{(averagePrecipitation * 7).toFixed(1)} mm</strong> of rainfall this week.
                </p>
                <p>
                  Soil condition:{" "}
                  {irrigationRecommendation?.deficit > 2
                    ? "Dry"
                    : irrigationRecommendation?.deficit < -2
                    ? "Wet"
                    : "Balanced"}
                </p>
                <button
                  onClick={() => fetchData(latitude, longitude)}
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                >
                  Refresh Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Irrigation;
