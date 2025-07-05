# 🌿 Farm Help – Smart Plant Disease Detection & Agricultural Assistance

Farm Help is an AI-powered web application built to support farmers by offering real-time plant disease detection, crop and fertilizer recommendations, irrigation guidance, weather forecasts, and expert connectivity — all through a user-friendly interface.

## 🔍 Features

- 📷 **Plant Disease Detection** – Upload a plant image and get instant disease predictions using a trained ML model.
- 🌱 **Crop Recommendations** – Get suitable crop suggestions based on your region or soil.
- 💧 **Irrigation Help** – Understand when and how much to water your crops.
- 🌦️ **Weather Forecast** – Stay updated with current weather conditions for smarter farming.
- 🧪 **Fertilizer Suggestions** – Recommendations based on crop and soil needs.
- 🤝 **Connect to Experts** – Get professional agricultural advice.

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- React PDF

### **Backend**
- Flask (Python)
- Flask-CORS
- ML Model for plant disease detection

### **Other Tools**
- OpenWeatherMap API (for weather data)
- Headless UI (for dropdowns/accordion)
- React Icons

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/farm-help.git
cd farm-help
```

### 2. Frontend Setup
cd frontend
npm install
npm start

### 3. Backend setup
cd backend
pip install -r requirements.txt
python app.py

##🧠 ML Models and Algorithms

###1. Plant Disease Detection
Algorithm Used: Convolutional Neural Network (CNN)
Framework: TensorFlow or PyTorch
Dataset: PlantVillage dataset (common choice)
Output: Class label like Tomato___Leaf_Mold, Potato___Early_Blight, or Healthy

###2. Crop Recommendation
Algorithm Used: Random Forest Classifier
Input Features: N (Nitrogen), P (Phosphorus), K (Potassium), temperature, humidity, pH, rainfall
Output: Suggested crop name (e.g., Rice, Maize, Cotton)
Dataset: Collected from public agriculture datasets (like Kaggle's crop recommendation data)

###3. Fertilizer Recommendation
Algorithm Used: Random Forest Classifier
Input Features: Crop name, soil nutrients, moisture
Output: Recommended NPK-based fertilizer and dosage
Note: Can be improved using supervised learning (SVM/Random Forest)


##🚀 Future Improvements

Multi-language support
Disease severity detection
Chatbot for Q&A with experts
Admin dashboard for monitoring usage


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
