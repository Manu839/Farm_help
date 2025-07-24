import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTemperatureLow,
  FaTint,
  FaSpinner,
  FaLeaf,
  FaRedo,
  FaAtom,
  FaFire,
  FaBolt,
  FaBalanceScale,
  FaCloudRain,
  FaExclamationTriangle,
  FaSeedling,
} from "react-icons/fa";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    ph: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHERAPI_KEY}&q=${latitude},${longitude}`
          );
          const data = await response.json();

          if (data?.current) {
            setFormData((prev) => ({
              ...prev,
              temperature: data.current.temp_c.toFixed(1),
              humidity: data.current.humidity,
              rainfall: data.current.precip_mm,
            }));
          }
        } catch (err) {
          console.error("Failed to fetch weather data", err);
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setPredictionError("");
    setPredictionLoading(true);

    try {
      const payload = {
        N: parseFloat(formData.nitrogen),
        P: parseFloat(formData.phosphorous),
        K: parseFloat(formData.pottasium),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
      };

      const response = await fetch("http://localhost:5000/api/recommend_crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.recommended_crop) {
        setPrediction(data.recommended_crop);
      } else {
        setPredictionError(data.error || "Failed to get recommendation");
      }
    } catch (error) {
      console.error("Error getting crop recommendation:", error);
      setPredictionError("Failed to connect to prediction service");
    } finally {
      setPredictionLoading(false);
    }
  };

  const renderPredictionResults = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white w-screen rounded-3xl p-8 shadow-2xl border border-green-100 mt-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recommended Crop</h2>
        <div className="text-4xl font-bold text-green-600 mb-6">{prediction}</div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaSeedling className="mr-2 text-green-500" />
          Input Parameters Used
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="flex justify-between"><span className="font-medium">Nitrogen (N):</span> <span>{formData.nitrogen} kg/ha</span></p>
            <p className="flex justify-between"><span className="font-medium">Phosphorous (P):</span> <span>{formData.phosphorous} kg/ha</span></p>
            <p className="flex justify-between"><span className="font-medium">Potassium (K):</span> <span>{formData.pottasium} kg/ha</span></p>
            <p className="flex justify-between"><span className="font-medium">pH Level:</span> <span>{formData.ph}</span></p>
          </div>
          <div className="space-y-2">
            <p className="flex justify-between"><span className="font-medium">Rainfall:</span> <span>{formData.rainfall} mm</span></p>
            <p className="flex justify-between"><span className="font-medium">Temperature:</span> <span>{formData.temperature}°C</span></p>
            <p className="flex justify-between"><span className="font-medium">Humidity:</span> <span>{formData.humidity}%</span></p>
          </div>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setPrediction(null)} 
        className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
      >
        <FaRedo className="inline mr-2" /> Get New Recommendation
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <FaSeedling className="text-5xl text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Crop Recommendation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered crop suggestions based on your soil composition and environmental conditions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {prediction ? (
            renderPredictionResults()
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {predictionError && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center text-red-700"
                  >
                    <FaExclamationTriangle className="mr-3 text-xl" />
                    <span className="font-medium">{predictionError}</span>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: "Nitrogen (N)", icon: FaAtom, name: "nitrogen", unit: "kg/ha", color: "from-blue-400 to-blue-600" },
                    { label: "Phosphorous (P)", icon: FaFire, name: "phosphorous", unit: "kg/ha", color: "from-orange-400 to-red-600" },
                    { label: "Potassium (K)", icon: FaBolt, name: "pottasium", unit: "kg/ha", color: "from-yellow-400 to-orange-600" },
                    { label: "pH Level", icon: FaBalanceScale, name: "ph", unit: "", color: "from-purple-400 to-purple-600" },
                    { label: "Rainfall", icon: FaCloudRain, name: "rainfall", unit: "mm", color: "from-blue-400 to-cyan-600" },
                    { label: "Temperature", icon: FaTemperatureLow, name: "temperature", unit: "°C", color: "from-red-400 to-pink-600" },
                    { label: "Humidity", icon: FaTint, name: "humidity", unit: "%", color: "from-teal-400 to-blue-600" },
                  ].map(({ label, icon: Icon, name, unit, color }) => (
                    <div key={name} className="space-y-2">
                      <label htmlFor={name} className="flex items-center font-semibold text-gray-700">
                        <div className={`w-8 h-8 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mr-3`}>
                          <Icon className="text-white text-sm" />
                        </div>
                        {label} {unit && <span className="text-gray-500 ml-1">({unit})</span>}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={predictionLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {predictionLoading ? (
                    <>
                      <FaSpinner className="inline animate-spin mr-3" />
                      Analyzing Conditions...
                    </>
                  ) : (
                    <>
                      <FaSeedling className="inline mr-3" />
                      Get Crop Recommendation
                    </>
                  )}
                </motion.button>
              </form>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {[
                  { title: "Soil Analysis", desc: "NPK values determine nutrient availability", icon: "🌱" },
                  { title: "Climate Factors", desc: "Temperature and humidity affect growth", icon: "🌤️" },
                  { title: "Water Management", desc: "Rainfall data helps optimize irrigation", icon: "💧" }
                ].map((info, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100">
                    <div className="text-2xl mb-2">{info.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;