import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaPencilAlt, FaPaperPlane } from "react-icons/fa";
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

  const inputStyle =
    "w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition";

  const inputs = [
    { id: "name", icon: <FaUser />, placeholder: "Your Name" },
    { id: "email", icon: <FaEnvelope />, placeholder: "Your Email", type: "email" },
    { id: "subject", icon: <FaPencilAlt />, placeholder: "Subject" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-12 px-4 bg-gradient-to-br from-white to-gray-100 text-gray-800"
    >
      <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-6 text-green-600"
        >
          Contact Us
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {inputs.map(({ id, icon, type = "text", placeholder }) => (
            <div className="relative" key={id}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                {icon}
              </div>
              <input
                type={type}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className={inputStyle}
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status.isSubmitting}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
          >
            <FaPaperPlane />
            {status.isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {status.message && (
            <p className="text-center mt-4 text-sm font-medium text-green-700">{status.message}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
