import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {  FaSeedling, FaGithub } from 'react-icons/fa';

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
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <FaSeedling className="text-green-600 text-2xl mr-2" />
            <span className="text-xl font-bold text-green-600">Farm Help</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>

            <div className="relative group">
              <button className="text-gray-600 hover:text-green-600">Services</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md py-2 min-w-[180px] z-50">
                <Link to="/suggestion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Crop Suggestions
                </Link>
                <Link to="/fertilizerrecommendation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Fertilizer Recommendations
                </Link>
                <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Irrigation Help
                </Link>
                <Link to="/weather" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Weather Forecast
                </Link>
                <Link to="/connect" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Connect to Experts
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Contact Us
                </Link>
              </div>
            </div>

            <Link to="/about" className="text-gray-600 hover:text-green-600">About</Link>

            <a
              href="https://github.com/Manu839/Farm_help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <FaGithub className="text-xl" />
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
      <footer className="bg-white py-8 text-center">
        <div className="flex justify-center">
          <a
            href="https://github.com/Manu839/Farm_help"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-600 text-2xl"
          >
            <FaGithub />
          </a>
        </div>
        <p className="text-gray-600 text-sm mt-2">© {new Date().getFullYear()} Farm Help. All rights reserved.</p>
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
