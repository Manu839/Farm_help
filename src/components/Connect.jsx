import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp, FaUser, FaRupeeSign, FaStar, FaGraduationCap, FaAward } from "react-icons/fa";

const Connect = () => {
  const experts = [
    {
      id: 1,
      name: "Dr. Ageetha V",
      description: "Assistant Professor Chemistry, Expert in writing Scientific Articles, Dedicated and hardworking to complete the task",
      specialization: "Plant Chemistry & Disease Analysis",
      experience: "8+ years",
      rating: 4.9,
      price: 700,
      imageUrl: "/assets/ageeta.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
      achievements: ["PhD in Agricultural Chemistry", "50+ Research Papers", "Plant Disease Specialist"]
    },
    {
      id: 2,
      name: "Dr. Parmod S",
      description: "Freelance Medical writer with 5+ years of research, Biostatistics, DNA Fingerprinting, Forensic Anthropology",
      specialization: "Crop Genetics & Biostatistics",
      experience: "5+ years",
      rating: 4.7,
      price: 300,
      imageUrl: "/assets/pramod.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
      achievements: ["MSc in Biotechnology", "DNA Analysis Expert", "Research Consultant"]
    },
    {
      id: 3,
      name: "Dr. Jaya G.",
      description: "Expert with 5 star ratings in research in Social Policy, Social Sciences | Public Policy Specialist |",
      specialization: "Agricultural Policy & Sustainability",
      experience: "6+ years",
      rating: 5.0,
      price: 350,
      imageUrl: "/assets/id3.png",
      phone: "+917987177566",
      whatsapp: "+917987177566",
      achievements: ["PhD in Agricultural Policy", "Sustainability Expert", "Government Advisor"]
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Connect with <span className="text-green-600">Agricultural Experts</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from certified agricultural specialists and researchers 
            to solve your farming challenges and optimize your crop yields.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Expert Image & Rating */}
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={expert.imageUrl}
                        alt={expert.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                        <FaAward className="text-yellow-800 text-sm" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <FaUser className="mr-2" />
                        <h3 className="text-xl font-bold">{expert.name}</h3>
                      </div>
                      
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-sm ${i < Math.floor(expert.rating) ? 'text-yellow-300' : 'text-white/30'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">{expert.rating}</span>
                      </div>
                      
                      <p className="text-green-100 text-sm">{expert.specialization}</p>
                    </div>
                  </div>
                </div>

                {/* Expert Details */}
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {expert.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FaGraduationCap className="mr-1 text-green-500" />
                        <span>{expert.experience} experience</span>
                      </div>
                      <div className="flex items-center font-semibold text-green-600">
                        <FaRupeeSign className="text-sm" />
                        <span>{expert.price}/hour</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                      <div className="space-y-1">
                        {expert.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`tel:${expert.phone}`}
                      className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
                    >
                      <FaPhone className="mr-2" />
                      Call Now
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/${expert.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp Chat
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Our Experts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Experts?</h2>
            <p className="text-xl text-gray-600">Professional agricultural consultation with proven results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🎓", title: "Certified Professionals", desc: "PhD holders and certified agricultural specialists" },
              { icon: "🔬", title: "Research-Based Solutions", desc: "Evidence-based recommendations from latest research" },
              { icon: "📞", title: "24/7 Support", desc: "Available for emergency consultations during critical periods" },
              { icon: "💡", title: "Personalized Advice", desc: "Tailored solutions for your specific farming conditions" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with our experts today and get personalized solutions for your agricultural challenges. 
            Professional consultation starts at just ₹300/hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border-2 border-white/30 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Connect;