import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "./PdfButton";
import { FaDownload } from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:5000"; // Base URL for media files

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
    return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
  if (!diseaseInfo)
    return <p className="text-center text-gray-600 dark:text-gray-300">No data available.</p>;

  return (
    <div className="min-h-screen px-6 py-12 bg-green-50 dark:bg-green-900/20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl">

        {/* ✅ Display Disease Image */}
        {diseaseInfo.image && (
          <div className="flex justify-center mb-4">
            <img
              src={`${BASE_URL}${diseaseInfo.image}`} // Concatenate base URL + image path
              alt={diseaseInfo.name}
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          {diseaseInfo?.name || "Unknown Disease"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          {diseaseInfo?.description || "No description available."}
        </p>

        {/* Cause */}
        {diseaseInfo?.cause && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cause</h3>
            <p className="text-gray-600 dark:text-gray-300">{diseaseInfo.cause}</p>
          </div>
        )}

        {/* Symptoms */}
        {diseaseInfo?.symptoms?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Symptoms</h3>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
              {diseaseInfo.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Prevention */}
        {diseaseInfo?.prevention?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Prevention</h3>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
              {diseaseInfo.prevention.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Solution */}
        {diseaseInfo?.solution && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Solution</h3>
            <p className="text-gray-600 dark:text-gray-300">{diseaseInfo.solution}</p>
          </div>
        )}

        {/* YouTube Video Link */}
        {diseaseInfo?.link && (
          <div className="mt-6 text-center">
            <a
              href={diseaseInfo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg inline-block"
            >
              📺 Watch on YouTube
            </a>
          </div>
        )}

        {/* PDF Download Link */}
        <PDFDownloadLink document={<PDFReport diseaseInfo={diseaseInfo} />} fileName="disease-report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              <p className="text-center text-gray-600 dark:text-gray-300">Generating PDF...</p>
            ) : (
              <a
                href={url}
                download="disease-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md inline-flex items-center mt-2"
              >
                <FaDownload className="mr-1 text-xs" />
                Download PDF
              </a>
            )
          }
        </PDFDownloadLink>

      </div>
    </div>
  );
};

export default DiseaseInfoPage;
