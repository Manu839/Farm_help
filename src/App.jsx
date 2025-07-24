import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaSeedling, FaGithub, FaChevronDown } from 'react-icons/fa';

import HomePage from './components/HomePage';
import DiseaseInfoPage from './components/DiseaseInfoPage';
import AboutPage from './components/AboutPage';
import WeatherCard from './components/WeatherCard';
import Connect from './components/Connect';
import Irrigation from './components/Irrigation';
import CropSuggestion from './components/CropSuggestion';
import Contact from './components/Contact';
import FertilizerRecommendation from './components/FertilizerRecommendation';

function MainPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult('Healthy plant detected! No diseases found.');
      }, 2000);
    }
  };


  return (
    <div className="min-h-screen w-screen">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-lg border-b border-green-100 z-50">
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-3">
              <FaSeedling className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Farm Help
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center bg-white text-gray-700 hover:text-green-600 font-medium transition-colors duration-200">
                Services
                <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-xl py-3 min-w-[220px] z-50 border border-green-100">
                <Link to="/suggestion" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Crop Suggestions
                </Link>
                <Link to="/fertilizerrecommendation" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Fertilizer Recommendations
                </Link>
                <Link to="/help" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Irrigation Help
                </Link>
                <Link to="/weather" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Weather Forecast
                </Link>
                <Link to="/connect" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Connect to Experts
                </Link>
                <Link to="/contact" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                  Contact Us
                </Link>
              </div>
            </div>

            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200">
              About
            </Link>

            <a
              href="https://github.com/Manu839/Farm_help"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <FaGithub className="text-lg" />
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={
            <HomePage
              handleImageUpload={handleImageUpload}
              selectedImage={selectedImage}
              isAnalyzing={isAnalyzing}
              result={result}
    
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/diseaseinfo/:diseaseName" element={<DiseaseInfoPage />} />
          <Route path="/weather" element={<WeatherCard />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/help" element={<Irrigation />} />
          <Route path="/suggestion" element={<CropSuggestion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fertilizerrecommendation" element={<FertilizerRecommendation />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-50 to-green-100 py-12 text-center border-t border-green-200">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <FaSeedling className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Farm Help</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Empowering farmers with AI-driven solutions for better crop management and sustainable agriculture.
          </p>
          <div className="flex justify-center mb-6">
          <a
            href="https://github.com/Manu839/Farm_help"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 hover:text-green-600 hover:bg-white rounded-xl transition-all duration-200 shadow-sm"
          >
            <FaGithub className="text-xl" />
          </a>
          </div>
          <div className="border-t border-green-200 pt-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Farm Help. All rights reserved. Made with ❤️ for farmers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainPage />
    </Router>
  );
}

export default App;
