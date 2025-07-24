import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaDownload, FaYoutube, FaLeaf, FaExclamationTriangle, FaBug, FaShieldAlt, FaMedkit } from "react-icons/fa";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer";

// PDF Report Component (integrated)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#4CAF50',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666666',
  },
});

const PDFReport = ({ diseaseInfo }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Farm Help - Plant Disease Report</Text>
          <Text style={styles.text}>{`Generated on: ${currentDate}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>{diseaseInfo.name}</Text>
          
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.text}>{diseaseInfo.description}</Text>

          <Text style={styles.subtitle}>Cause</Text>
          <Text style={styles.text}>{diseaseInfo.cause}</Text>

          <Text style={styles.subtitle}>Symptoms</Text>
          {diseaseInfo.symptoms.map((symptom, index) => (
            <Text key={index} style={styles.text}>{symptom}</Text>
          ))}

          <Text style={styles.subtitle}>Prevention</Text>
          {diseaseInfo.prevention.map((step, index) => (
            <Text key={index} style={styles.text}>{step}</Text>
          ))}

          <Text style={styles.subtitle}>Solution</Text>
          <Text style={styles.text}>{diseaseInfo.solution}</Text>

          <Text style={styles.subtitle}>Youtube Link</Text>
          <Text style={styles.text}>{diseaseInfo.link}</Text>
        </View>
      </Page>
    </Document>
  );
};

const BASE_URL = "http://127.0.0.1:5000"; 

const DiseaseInfoPage = () => {
  const { diseaseName } = useParams();
  const decodedDiseaseName = decodeURIComponent(diseaseName);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseaseInfo = async () => {
      if (!decodedDiseaseName) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/diseaseinfo/${encodeURIComponent(decodedDiseaseName)}`
        );
        setDiseaseInfo(response.data);
      } catch (err) {
        setError("Failed to load disease information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiseaseInfo();
  }, [decodedDiseaseName]);

  if (loading)
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <FaLeaf className="absolute inset-0 m-auto text-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Information</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );

  if (!diseaseInfo)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-gray-400 text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
            <p className="text-gray-600">Disease information not found.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-lime-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FaLeaf className="text-5xl text-green-500 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {diseaseInfo?.name || "Unknown Disease"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive information and treatment guidance
            </p>
          </div>

          {/* Disease Image */}
          {diseaseInfo.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <div className="relative">
                <img
                  src={`${BASE_URL}${diseaseInfo.image}`}
                  alt={diseaseInfo.name}
                  className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-green-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-green-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Description</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {diseaseInfo?.description || "No description available."}
              </p>
            </motion.div>

            {/* Cause */}
            {diseaseInfo?.cause && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-green-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <FaBug className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Cause</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{diseaseInfo.cause}</p>
              </motion.div>
            )}
          </div>

          {/* Symptoms */}
          {diseaseInfo?.symptoms?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 mt-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                  <FaExclamationTriangle className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Symptoms</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {diseaseInfo.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">{symptom}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prevention */}
          {diseaseInfo?.prevention?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 mt-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Prevention</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {diseaseInfo.prevention.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Solution */}
          {diseaseInfo?.solution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl text-white mt-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <FaMedkit className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold">Treatment Solution</h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">{diseaseInfo.solution}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
          >
            {/* YouTube Link */}
            {diseaseInfo?.link && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={diseaseInfo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
              >
                <FaYoutube className="mr-3 text-xl" />
                Watch Treatment Video
              </motion.a>
            )}

            {/* PDF Download */}
            <PDFDownloadLink 
              document={<PDFReport diseaseInfo={diseaseInfo} />} 
              fileName={`${diseaseInfo.name}-report.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <div className="flex items-center justify-center px-8 py-4 bg-gray-400 text-white font-semibold rounded-2xl cursor-not-allowed">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Generating PDF...
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
                  >
                    <FaDownload className="mr-3 text-xl" />
                    Download Report PDF
                  </motion.div>
                )
              }
            </PDFDownloadLink>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiseaseInfoPage;