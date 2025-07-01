import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaHeart, FaSeedling, FaUsers, FaLightbulb, FaRobot } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-12 pb-12"
    >
      {/* Introduction */}
      <section className="bg-gradient-to-b from-green-50 to-white ">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Farm Help
            </h1>
            <p className="text-xl text-gray-700">
              Empowering farmers with smart tools to boost productivity and sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-green-100 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Farm Help, our mission is to make advanced agricultural technology accessible to every farmer. We aim to improve crop health, optimize resources, and ensure better yields through AI-powered features and real-time data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FaSeedling className="text-5xl text-green-600 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Built Farm Help</h2>
            <p className="text-gray-700 leading-relaxed">
              We saw the challenges farmers face—unpredictable weather, soil nutrient loss, pests, and limited expert access. Farm Help was created to provide a reliable support system that helps farmers make informed decisions every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaUsers className="text-5xl text-green-600 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-gray-700 mb-12 leading-relaxed">
              We're a group of technologists, researchers, and agriculture experts passionate about transforming farming with AI and data-driven solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Farm Help */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Farm Help</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FaRobot,
                title: "Smart Disease Detection",
                description: "Identify plant diseases instantly using machine learning and take preventive action before it's too late."
              },
              {
                icon: FaHeart,
                title: "Personalized Crop & Fertilizer Advice",
                description: "Get the best crop and fertilizer recommendations based on your soil and weather data."
              },
              {
                icon: FaLightbulb,
                title: "Real-time Weather & Irrigation Help",
                description: "Access accurate forecasts and get watering suggestions to save resources and ensure healthy growth."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <feature.icon className="text-4xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </motion.div>
  );
};

export default AboutPage;
