import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaCamera, FaRobot, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setResult("");

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error detecting disease. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const handleLearnMore = () => {
    if (!result) return;
    navigate(`/diseaseinfo/${encodeURIComponent(result)}`);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-12 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Farm Help
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get plant disease detection, crop & fertilizer recommendations, irrigation help, weather updates, and connect with agricultural experts.
          </p>
          <div className="max-w-xl mx-auto">
            <label className="relative group cursor-pointer">
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              <div className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200">
                <FaUpload className="mr-2" />
                Upload a Plant Image
              </div>
            </label>
          </div>
        </div>
      </motion.section>

      {/* Image Preview & Result */}
      {imagePreview && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <img src={imagePreview} alt="Plant" className="rounded-lg shadow-lg mb-6 mx-auto" />
              <button
                onClick={analyzeImage}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </button>
              {result && (
                <div className="bg-green-50 p-6 rounded-lg mt-4">
                  <p className="text-gray-900 font-semibold">
                    Disease: {result}
                  </p>
                  {result.toLowerCase().includes("healthy") ? (
                    <p className="text-green-600 font-medium mt-2">Your plant appears healthy.</p>
                  ) : (
                    <button
                      onClick={handleLearnMore}
                      className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white"
                    >
                      Learn More
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaCamera,
                title: "Capture",
                description: "Take or upload a picture of your plant."
              },
              {
                icon: FaRobot,
                title: "Analyze",
                description: "Let our AI model detect any disease in the plant."
              },
              {
                icon: FaClipboardList,
                title: "Get Diagnosis",
                description: "View the results with disease name and suggestions."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-green-50 p-6 rounded-lg text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
