from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import (
    load_model,
    preprocess,
    decode_prediction,
    load_crop_model,
    load_fertilizer_model
)
from PIL import Image
import io
import torch

app = Flask(__name__)
CORS(app)

plant_model = load_model()
crop_model = load_crop_model()
fertilizer_model = load_fertilizer_model()

# Crop Recommendation 
@app.route('/api/recommend_crop', methods=['POST'])
def recommend_crop():
    try:
        data = request.get_json()
        features = [[
            data['N'],
            data['P'],
            data['K'],
            data['temperature'],
            data['humidity'],
            data['ph'],
            data['rainfall']
        ]]
        crop = crop_model.predict(features)[0]
        return jsonify({"recommended_crop": crop})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Plant Disease Prediction
@app.route('/api/predict_disease', methods=['POST'])
def predict_disease():
    try:
        file = request.files['image']
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        input_tensor = preprocess(image)
        with torch.no_grad():
            output = plant_model(input_tensor)
        prediction = decode_prediction(output)
        return jsonify({"predicted_disease": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fertilizer Recommendation 
@app.route('/api/recommend_fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        data = request.get_json()

        soil_encoder = joblib.load("model_files/soil_encoder.pkl")
        crop_encoder = joblib.load("model_files/crop_encoder.pkl")

        encoded_soil = soil_encoder.transform([data['Soil Type']])[0]
        encoded_crop = crop_encoder.transform([data['Crop Type']])[0]

        features = [[
            float(data['Temperature']),
            float(data['Humidity']),
            float(data['Moisture']),
            encoded_soil,
            encoded_crop,
            int(data['Nitrogen']),
            int(data['Potassium']),
            int(data['Phosphorous'])
        ]]

        prediction = fertilizer_model.predict(features)[0]
        return jsonify({"recommended_fertilizer": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "backend is running 🚜"

if __name__ == '__main__':
    app.run(debug=True)
