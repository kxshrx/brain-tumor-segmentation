from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "models/best_model.keras"
model = load_model(MODEL_PATH)

# Define class labels (Adjust according to your dataset)
class_labels = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]

# Function to preprocess image
def preprocess_image(img_path):
    img_size = (224, 224)
    img = image.load_img(img_path, target_size=img_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize pixel values
    return img_array

# Default route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Brain Tumor Classification API is running!"})

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    # Preprocess and predict
    img_array = preprocess_image(file_path)
    preds = model.predict(img_array)
    predicted_class = class_labels[np.argmax(preds)]
    confidence = round(100 * np.max(preds), 2)

    # Remove temp file
    os.remove(file_path)

    return jsonify({
        "prediction": predicted_class,
        "confidence": float(confidence)  # Convert to standard Python float
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
