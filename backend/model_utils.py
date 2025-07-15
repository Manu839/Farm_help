import torch
import torchvision.transforms as transforms
from PIL import Image
import pandas as pd
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# 🧠 CNN for Plant Disease
class PlantDiseaseCNN(torch.nn.Module):
    def __init__(self, num_classes=15):
        super(PlantDiseaseCNN, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = torch.nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.conv3 = torch.nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.pool = torch.nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = torch.nn.Linear(128 * 16 * 16, 256)
        self.fc2 = torch.nn.Linear(256, num_classes)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = self.pool(torch.relu(self.conv3(x)))
        x = x.view(x.shape[0], -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Class Labels
class_labels = [
    'Pepper Bell Bacterial Spot', 'Pepper Bell Healthy', 'Potato Early Blight',
    'Potato Late Blight', 'Potato Healthy', 'Tomato Bacterial Spot', 'Tomato Early Blight',
    'Tomato Late Blight', 'Tomato Leaf Mold', 'Tomato Septoria Leaf Spot',
    'Tomato Spider Mites Two-Spotted Spider Mite', 'Tomato Target Spot',
    'Tomato Yellow Leaf Curl Virus', 'Tomato Mosaic Virus', 'Tomato Healthy'
]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model():
    model = PlantDiseaseCNN(num_classes=15)
    model.load_state_dict(torch.load("model_files/model.pth", map_location=device))
    model.to(device)
    model.eval()
    return model

def preprocess(image):
    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.RandomRotation(20),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomVerticalFlip(p=0.5),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])
    return transform(image).unsqueeze(0).to(device)

def decode_prediction(pred_tensor):
    idx = torch.argmax(pred_tensor, dim=1).item()
    return class_labels[idx] if idx < len(class_labels) else "Unknown"

# Train Crop Recommendation Model
def load_crop_model():
    model_path = "model_files/CropRecommendation.pkl"
    if os.path.exists(model_path):
        return joblib.load(model_path)
    else:
        df = pd.read_csv("model_files/Crop_recommendation.csv")
        X = df.drop('label', axis=1)
        y = df['label']
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        joblib.dump(model, model_path)
        return model
# Train Ferti Recommendation Model
def load_fertilizer_model():
    model_path = "model_files/FertilizerRecommendation.pkl"
    if os.path.exists(model_path):
        return joblib.load(model_path)
    else:
        df = pd.read_csv("model_files/Fertilizer.csv")

       
        df.rename(columns=lambda x: x.strip(), inplace=True)
        print("Cleaned Columns:", df.columns.tolist()) 

        from sklearn.preprocessing import LabelEncoder
        le_soil = LabelEncoder()
        le_crop = LabelEncoder()
        df["Soil Type"] = le_soil.fit_transform(df["Soil Type"])
        df["Crop Type"] = le_crop.fit_transform(df["Crop Type"])

        X = df.drop(columns=["Fertilizer"])
        y = df["Fertilizer"]

        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)

        joblib.dump(model, model_path)
        joblib.dump(le_soil, "model_files/soil_encoder.pkl")
        joblib.dump(le_crop, "model_files/crop_encoder.pkl")

        return model

