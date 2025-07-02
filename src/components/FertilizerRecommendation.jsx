import React, { useState, useEffect } from "react";

const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];

const cropTypes = [
  "Maize",
  "Sugarcane",
  "Cotton",
  "Tobacco",
  "Paddy",
  "Barley",
  "Wheat",
  "Millets",
  "Oil seeds",
  "Pulses",
  "Ground Nuts"
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

  // 🌦️ Auto fetch weather
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Fertilizer Recommendation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["Temperature", "Humidity", "Moisture", "Nitrogen", "Phosphorous", "Potassium"].map((key) => (
          <div key={key}>
            <label className="block mb-1 font-medium text-gray-700">{key}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium text-gray-700">Soil Type</label>
          <select
            name="Soil Type"
            value={formData["Soil Type"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            {soilTypes.map((soil, idx) => (
              <option key={idx} value={idx}>{soil}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Crop Type</label>
          <select
            name="Crop Type"
            value={formData["Crop Type"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            {cropTypes.map((crop, idx) => (
              <option key={idx} value={idx}>{crop}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Loading..." : "Get Recommendation"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-green-800 text-center font-semibold">
          Recommended Fertilizer: {result}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded text-red-700 text-center font-semibold">
          {error}
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;
