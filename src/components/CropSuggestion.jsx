import React, { useEffect, useState } from "react";
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
    <div className="p-4 bg-green-50 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold flex items-center mb-3">
        <FaLeaf className="mr-2 text-green-600" /> Recommended Crop
      </h2>
      <div className="text-2xl font-bold text-green-700 mb-4">{prediction}</div>

      <h3 className="text-lg font-medium mb-2">Input Details:</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>N-P-K: {formData.nitrogen} - {formData.phosphorous} - {formData.pottasium}</li>
        <li>pH: {formData.ph}</li>
        <li>Rainfall: {formData.rainfall} mm</li>
        <li>Temperature: {formData.temperature}&deg;C</li>
        <li>Humidity: {formData.humidity}%</li>
      </ul>

      <button onClick={() => setPrediction(null)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        <FaRedo className="inline mr-1" /> New Prediction
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
  
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center  text-green-700 font-bold mb-2">Crop Recommendation</h1>
        <p className="text-gray-600 text-center mb-6">Enter soil and weather parameters to get a crop suggestion.</p>

        {prediction ? (
          renderPredictionResults()
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            {predictionError && (
              <div className="text-red-600 flex items-center">
                <FaExclamationTriangle className="mr-2" /> {predictionError}
              </div>
            )}

            {[
              { label: "Nitrogen", icon: FaAtom, name: "nitrogen" },
              { label: "Phosphorous", icon: FaFire, name: "phosphorous" },
              { label: "Potassium", icon: FaBolt, name: "pottasium" },
              { label: "pH", icon: FaBalanceScale, name: "ph" },
              { label: "Rainfall (mm)", icon: FaCloudRain, name: "rainfall" },
              { label: "Temperature (°C)", icon: FaTemperatureLow, name: "temperature" },
              { label: "Humidity (%)", icon: FaTint, name: "humidity" },
            ].map(({ label, icon: Icon, name }) => (
              <div key={name}>
                <label htmlFor={name} className="block font-medium mb-1">
                  <Icon className="inline mr-1 text-gray-600" /> {label}
                </label>
                <input
                  type="number"
                  step="0.1"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={predictionLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {predictionLoading ? (
                <>
                  <FaSpinner className="inline animate-spin mr-2" /> Predicting...
                </>
              ) : (
                "Predict"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
