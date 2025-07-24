import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFlask, FaSeedling, FaThermometerHalf, FaTint, FaLeaf, FaSpinner } from "react-icons/fa";

const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
const cropTypes = [
  "Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", "Barley", 
  "Wheat", "Millets", "Oil seeds", "Pulses", "Ground Nuts"
];

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    Temperature: "",
    Humidity: "",
    Moisture: "",
    "Soil Type": "0",
    "Crop Type": "0",
    Nitrogen: "",
    Phosphorous: "",
    Potassium: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${latitude},${longitude}`
        );
        const data = await res.json();
        if (data && data.current) {
          setFormData((prev) => ({
            ...prev,
            Temperature: data.current.temp_c,
            Humidity: data.current.humidity,
          }));
        }
      } catch (err) {
        console.error("Weather API error:", err);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/recommend_fertilizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Temperature: parseFloat(formData.Temperature),
          Humidity: parseFloat(formData.Humidity),
          Moisture: parseFloat(formData.Moisture),
          "Soil Type": parseInt(formData["Soil Type"]),
          "Crop Type": parseInt(formData["Crop Type"]),
          Nitrogen: parseInt(formData.Nitrogen),
          Phosphorous: parseInt(formData.Phosphorous),
          Potassium: parseInt(formData.Potassium),
        }),
      });

      const data = await response.json();
      if (data.recommended_fertilizer) {
        setResult(data.recommended_fertilizer);
      } else {
        setError(data.error || "Unknown error occurred");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <FaFlask className="text-5xl text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Fertilizer Recommendation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized fertilizer suggestions based on your soil composition, crop type, and environmental conditions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaFlask className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Recommended Fertilizer</h2>
              <div className="text-4xl font-bold text-green-600 mb-8">{result}</div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="mb-2"><strong>Soil Type:</strong> {soilTypes[formData["Soil Type"]]}</p>
                    <p className="mb-2"><strong>Crop:</strong> {cropTypes[formData["Crop Type"]]}</p>
                    <p className="mb-2"><strong>Temperature:</strong> {formData.Temperature}°C</p>
                    <p><strong>Humidity:</strong> {formData.Humidity}%</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong>Soil Moisture:</strong> {formData.Moisture}%</p>
                    <p className="mb-2"><strong>Nitrogen:</strong> {formData.Nitrogen} ppm</p>
                    <p className="mb-2"><strong>Phosphorous:</strong> {formData.Phosphorous} ppm</p>
                    <p><strong>Potassium:</strong> {formData.Potassium} ppm</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setResult("")}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
              >
                Get New Recommendation
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-700 text-center font-semibold"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Environmental Conditions */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaThermometerHalf className="mr-2 text-green-500" />
                    Environmental Conditions
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Temperature", name: "Temperature", unit: "°C", icon: FaThermometerHalf },
                      { label: "Humidity", name: "Humidity", unit: "%", icon: FaTint },
                      { label: "Soil Moisture", name: "Moisture", unit: "%", icon: FaTint },
                    ].map(({ label, name, unit, icon: Icon }) => (
                      <div key={name}>
                        <label className="flex items-center font-medium text-gray-700 mb-2">
                          <Icon className="mr-2 text-green-500" />
                          {label} ({unit})
                        </label>
                        <input
                          type="number"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soil & Crop Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaSeedling className="mr-2 text-green-500" />
                    Soil & Crop Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Soil Type</label>
                      <select
                        name="Soil Type"
                        value={formData["Soil Type"]}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                        required
                      >
                        {soilTypes.map((soil, idx) => (
                          <option key={idx} value={idx}>{soil}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Crop Type</label>
                      <select
                        name="Crop Type"
                        value={formData["Crop Type"]}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                        required
                      >
                        {cropTypes.map((crop, idx) => (
                          <option key={idx} value={idx}>{crop}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Nutrient Levels */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaLeaf className="mr-2 text-green-500" />
                    Current Nutrient Levels (ppm)
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Nitrogen (N)", name: "Nitrogen", color: "from-blue-400 to-blue-600" },
                      { label: "Phosphorous (P)", name: "Phosphorous", color: "from-orange-400 to-red-600" },
                      { label: "Potassium (K)", name: "Potassium", color: "from-yellow-400 to-orange-600" },
                    ].map(({ label, name, color }) => (
                      <div key={name}>
                        <label className="flex items-center font-medium text-gray-700 mb-2">
                          <div className={`w-4 h-4 bg-gradient-to-r ${color} rounded-full mr-2`}></div>
                          {label}
                        </label>
                        <input
                          type="number"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="inline animate-spin mr-3" />
                      Analyzing Soil Conditions...
                    </>
                  ) : (
                    <>
                      <FaFlask className="inline mr-3" />
                      Get Fertilizer Recommendation
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;