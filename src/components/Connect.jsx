import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp, FaUser, FaRupeeSign } from "react-icons/fa";

const Connect = () => {
  const experts = [
    {
      id: 1,
      name: "Dr. Ageetha V",
      description:
        "Assistant Professor Chemistry, Expert in writing Scientific Articles, Dedicated and hardworking to complete the task",
      price: 700,
      imageUrl: "/assets/ageeta.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
    },
    {
      id: 2,
      name: "Dr. Parmod S",
      description:
        "Freelance Medical writer with 5+ years of research, Biostatistics, DNA Fingerprinting, Forensic Anthropology",
      price: 300,
      imageUrl: "/assets/pramod.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
    },
    {
      id: 3,
      name: "Dr. Jaya G.",
      description:
        "Expert with 5 star ratings in research in Social Policy, Social Sciences | Public Policy Specialist |",
      price: 350,
      imageUrl: "/assets/id3.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-green-700">
            Connect with Experts
          </h1>
          <p className="text-lg text-gray-600">
            Get professional guidance from agricultural specialists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <img
                  src={expert.imageUrl}
                  alt={expert.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100 mb-4"
                />
                <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
                  <FaUser />
                  <span>{expert.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-4">{expert.description}</p>
                <div className="flex items-center justify-center gap-2 text-green-600 font-medium mb-4">
                  <FaRupeeSign />
                  {expert.price}/hour
                </div>
                <div className="flex gap-3 w-full">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`tel:${expert.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 font-medium py-2 rounded-lg hover:bg-green-200 transition"
                  >
                    <FaPhone />
                    Call
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/${expert.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 font-medium py-2 rounded-lg hover:bg-green-200 transition"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Connect;
