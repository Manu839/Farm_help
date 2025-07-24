import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaCamera, FaRobot, FaClipboardList, FaSeedling } from "react-icons/fa";
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
        className="pt-32 pb-20 w-screen bg-gradient-to-br from-green-50 via-green-25 to-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <FaSeedling className="mr-2" />
              AI-Powered Agricultural Solutions
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Farm Help
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your farming with AI-powered plant disease detection, smart crop recommendations, 
            precision irrigation guidance, real-time weather insights, and expert agricultural support.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-md mx-auto"
          >
            <label className="relative group cursor-pointer block">
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              <div className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <FaUpload className="mr-3 text-lg" />
                Upload Plant Image
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </label>
            
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: JPG, PNG, WEBP • Max size: 10MB
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Image Preview & Result */}
      {imagePreview && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 bg-gradient-to-b from-white to-green-25"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Analysis</h2>
                  <p className="text-gray-600">Our AI is examining your plant image</p>
                </div>
                
                <div className="relative mb-8">
                  <img 
                    src={imagePreview} 
                    alt="Plant" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg border-4 border-green-100" 
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-green-600 font-medium">Analyzing...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
              <button
                onClick={analyzeImage}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Analyzing Plant...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaRobot className="mr-3" />
                    Analyze with AI
                  </span>
                )}
              </button>
                </div>
                
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Analysis Result</h3>
                    <p className="text-2xl font-bold text-green-700 mb-4">
                      {result}
                    </p>
                  {result.toLowerCase().includes("healthy") ? (
                    <div className="bg-green-100 p-4 rounded-xl">
                      <p className="text-green-800 font-medium text-lg">🌱 Great news! Your plant appears healthy.</p>
                      <p className="text-green-600 text-sm mt-2">Keep up the good care routine!</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleLearnMore}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Get Treatment Guide
                    </button>
                  )}
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-green-25">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and accurate plant disease detection in three easy steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FaCamera,
                title: "Capture",
                description: "Take or upload a clear picture of your plant showing any concerning areas.",
                color: "from-green-400 to-green-500"
              },
              {
                icon: FaRobot,
                title: "Analyze",
                description: "Our advanced AI model analyzes the image using deep learning algorithms.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: FaClipboardList,
                title: "Get Diagnosis",
                description: "Receive instant results with disease identification and treatment recommendations.",
                color: "from-green-600 to-green-700"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100 text-center h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <step.icon className="text-white text-3xl" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-bold mb-4">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-12 border border-green-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                More Than Just Disease Detection
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Explore our comprehensive suite of agricultural tools designed to help you make informed decisions and maximize your crop yield.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "Crop Suggestions", icon: "🌾" },
                  { name: "Weather Forecast", icon: "🌤️" },
                  { name: "Irrigation Help", icon: "💧" },
                  { name: "Expert Connect", icon: "👨‍🌾" }
                ].map((feature, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{feature.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
