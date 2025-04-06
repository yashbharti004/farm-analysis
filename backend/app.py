from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load("crop_recommendation_model.pkl")

# Load historical data
historical_data_path = "dataset\FAOSTAT_data_en_3-23-2025.csv"
historical_data = pd.read_csv(historical_data_path)

# Root route
@app.route("/")
def home():
    return """
    <h1>Crop Recommendation System</h1>
    <p>Welcome to the Crop Recommendation System API!</p>
    <p>Available endpoints:</p>
    <ul>
        <li><b>/recommend</b> (POST): Get crop recommendations based on input data.</li>
        <li><b>/most_beneficial_crop</b> (GET): Get the crop with the highest average yield.</li>
    </ul>
    """

# Endpoint for crop recommendation
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    input_data = pd.DataFrame([data])
    prediction = model.predict(input_data)
    return jsonify({"recommended_crop": prediction[0]})

# Endpoint for most beneficial crop
@app.route("/most_beneficial_crop", methods=["GET"])
def most_beneficial_crop():
    try:
        # Find the crop with the highest average yield
        crop_yield_avg = historical_data.groupby("Item")["Value"].mean()
        most_beneficial = crop_yield_avg.idxmax()
        return jsonify({"most_beneficial_crop": most_beneficial})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)