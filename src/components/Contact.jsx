import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaPencilAlt, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ isSubmitting: false, message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, message: "" });

    try {
      await axios.post("https://api.web3forms.com/submit", {
        access_key: "8e7ad9ef-d3a2-4279-91ad-cc5c3207a38a",
        ...formData,
      });
      setStatus({ isSubmitting: false, message: "✅ Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({ isSubmitting: false, message: "❌ Failed to send message. Try again later." });
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? We'd love to hear from you and help with your farming needs.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", icon: FaUser, placeholder: "Your Full Name", type: "text" },
                { id: "email", icon: FaEnvelope, placeholder: "Your Email Address", type: "email" },
                { id: "subject", icon: FaPencilAlt, placeholder: "Subject", type: "text" },
              ].map(({ id, icon: Icon, placeholder, type }) => (
                <div key={id} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon className="text-green-500" />
                  </div>
                  <input
                    type={type}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300 resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status.isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <FaPaperPlane />
                {status.isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-2xl font-medium ${
                    status.message.includes("✅") 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: FaPhone,
                  title: "Phone Support",
                  content: "+1 (555) 123-4567",
                  description: "Mon-Fri 9AM-6PM EST",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  icon: FaEnvelope,
                  title: "Email Us",
                  content: "support@farmhelp.com",
                  description: "We'll respond within 24 hours",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: FaMapMarkerAlt,
                  title: "Office Location",
                  content: "123 Agriculture Ave",
                  description: "Farm City, FC 12345",
                  color: "from-purple-500 to-pink-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <item.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-900 font-medium mb-1">{item.content}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white"
            >
              <div className="flex items-center mb-6">
                <FaClock className="text-2xl mr-3" />
                <h3 className="text-2xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/20 rounded-2xl">
                <p className="text-sm opacity-90">
                  🌱 Emergency agricultural support available 24/7 during critical growing seasons
                </p>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-green-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Questions?</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-800 mb-1">How accurate is the disease detection?</p>
                  <p className="text-gray-600">Our AI model has 95%+ accuracy rate with continuous improvements.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800 mb-1">Is the service free to use?</p>
                  <p className="text-gray-600">Basic features are free. Premium plans available for advanced analytics.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800 mb-1">Do you support all crop types?</p>
                  <p className="text-gray-600">We support 50+ crop varieties with regular additions.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;