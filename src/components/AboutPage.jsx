import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaHeart, FaSeedling, FaUsers, FaLightbulb, FaRobot, FaLeaf, FaShieldAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <FaSeedling className="text-6xl text-green-500 mx-auto mb-6 drop-shadow-lg" />
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
                About <span className="text-green-600">Farm Help</span>
              </h1>
              
              <p className="text-2xl text-gray-600 leading-relaxed">
                Empowering farmers with cutting-edge AI technology to boost productivity, 
                ensure crop health, and promote sustainable farming practices.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FaHeart className="text-white text-2xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed text-center">
                  At Farm Help, our mission is to democratize advanced agricultural technology, 
                  making it accessible to every farmer regardless of their scale of operation. 
                  We strive to improve crop health, optimize resource utilization, and ensure 
                  better yields through AI-powered insights and real-time agricultural data.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why We Built Farm Help */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-12">
                <FaLeaf className="text-5xl text-green-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Why We Built Farm Help</h2>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl">
                <p className="text-xl leading-relaxed">
                  We witnessed firsthand the challenges modern farmers face: unpredictable weather patterns, 
                  soil nutrient depletion, emerging pest threats, and limited access to agricultural expertise. 
                  Farm Help was born from the vision to create a comprehensive, intelligent support system 
                  that empowers farmers to make data-driven decisions every single day.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="mb-12">
                <FaUsers className="text-5xl text-green-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
              </div>
              
              <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100">
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  We're a passionate team of technologists, agricultural scientists, data researchers, 
                  and farming experts united by a common goal: transforming agriculture through 
                  innovative AI solutions and data-driven insights.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: FaRobot, title: "AI Engineers", desc: "Building intelligent crop analysis systems" },
                    { icon: FaSeedling, title: "Agricultural Scientists", desc: "Providing domain expertise and validation" },
                    { icon: FaLightbulb, title: "Innovation Team", desc: "Researching next-generation farming solutions" }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <member.icon className="text-white text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{member.title}</h3>
                      <p className="text-gray-600 text-sm">{member.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Farm Help</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive agricultural solutions powered by cutting-edge technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: FaRobot,
                  title: "AI-Powered Disease Detection",
                  description: "Advanced machine learning algorithms instantly identify plant diseases with high accuracy, enabling early intervention and treatment.",
                  color: "from-green-400 to-emerald-500"
                },
                {
                  icon: FaSeedling,
                  title: "Smart Crop Recommendations",
                  description: "Get personalized crop suggestions based on your soil composition, local climate conditions, and market demands.",
                  color: "from-emerald-400 to-green-500"
                },
                {
                  icon: FaLightbulb,
                  title: "Precision Irrigation Guidance",
                  description: "Optimize water usage with real-time weather data and soil moisture analysis for sustainable farming practices.",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: FaShieldAlt,
                  title: "Preventive Care Solutions",
                  description: "Proactive disease prevention strategies and early warning systems to protect your crops before problems arise.",
                  color: "from-blue-400 to-green-500"
                },
                {
                  icon: FaUsers,
                  title: "Expert Agricultural Support",
                  description: "Connect directly with certified agricultural specialists for personalized advice and professional consultation.",
                  color: "from-emerald-500 to-green-600"
                },
                {
                  icon: FaHeart,
                  title: "Sustainable Farming Focus",
                  description: "Promote environmentally friendly practices that improve soil health and ensure long-term agricultural sustainability.",
                  color: "from-green-600 to-emerald-700"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="text-white text-2xl" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of farmers who are already using Farm Help to improve their crop yields 
                and farming efficiency.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutPage;