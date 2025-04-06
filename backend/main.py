from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import cv2
import numpy as np
import tensorflow as tf
from database import SessionLocal, PlantDiagnosisDB, WeatherDataDB
import uuid
import requests
from datetime import datetime
import logging

# Initialize FastAPI (ONCE)
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model("models/plant_disease_model.h5")

# Define class labels (update based on your dataset)
CLASS_LABELS = [
    "Healthy",
    "Powdery Mildew",
    "Leaf Spot",
    "Aphids",
    "Nutrient Deficiency",
]

# Define solutions for each problem
SOLUTIONS = {
    "Healthy": "Your plant is healthy. No action required.",
    "Powdery Mildew": "Apply fungicide and ensure proper air circulation.",
    "Leaf Spot": "Remove affected leaves and apply copper-based fungicide.",
    "Aphids": "Use insecticidal soap or neem oil to control aphids.",
    "Nutrient Deficiency": "Apply a balanced fertilizer to address nutrient deficiency.",
}

# Weather API Key
API_KEY = "" 

# Dependency: Get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Farm Analysis System"}

@app.post("/analyze")
async def analyze_plant(image: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Read and preprocess the image
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (224, 224))
        img = img / 255.0
        img = np.expand_dims(img, axis=0)

        # Predict the class
        predictions = model.predict(img)
        predicted_class = CLASS_LABELS[np.argmax(predictions)]
        confidence = float(np.max(predictions)) * 100

        # Get the solution
        solution = SOLUTIONS.get(predicted_class, "No solution available.")

        # Save to Database
        diagnosis_data = PlantDiagnosisDB(
            id=str(uuid.uuid4()),
            image_id=str(uuid.uuid4()),
            diagnosis=predicted_class,
            confidence=confidence,
            solution=solution
        )
        db.add(diagnosis_data)
        db.commit()
        db.refresh(diagnosis_data)

        return {
            "diagnosis": predicted_class,
            "confidence": confidence,
            "solution": solution,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/weather")
async def get_weather(location: str = Query(..., description="Location for weather data")):
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}&units=metric"
        logger.info(f"Fetching weather data for: {location}")
        
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        temperature = data["main"]["temp"]
        humidity = data["main"]["humidity"]
        precipitation = data.get("rain", {}).get("1h", 0)

        # Generate advisory
        advisory = []
        if temperature > 30:
            advisory.append("High temperature: Increase irrigation and provide shade.")
        if humidity > 70:
            advisory.append("High humidity: Watch for fungal diseases and improve ventilation.")
        if precipitation > 5:
            advisory.append("Heavy rainfall: Ensure proper drainage.")
        if not advisory:
            advisory.append("Weather conditions are favorable for farming.")

        return {
            "location": location,
            "temperature": temperature,
            "humidity": humidity,
            "precipitation": precipitation,
            "advisory": " ".join(advisory),
        }

    except requests.exceptions.RequestException as e:
        logger.error(f"Weather API error: {e}")
        raise HTTPException(status_code=502, detail="Weather service unavailable")
    except KeyError as e:
        logger.error(f"Invalid weather data format: {e}")
        raise HTTPException(status_code=502, detail="Invalid weather data received")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/best-crop")
async def best_crop(location: str, season: str):
    try:
        # Get weather data first
        weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}&units=metric"
        weather_res = requests.get(weather_url)
        weather_res.raise_for_status()
        weather_data = weather_res.json()

        temp = weather_data["main"]["temp"]
        humidity = weather_data["main"]["humidity"]
        rain = weather_data.get("rain", {}).get("1h", 0)

        # Determine best crop
        crop = "No specific recommendation"
        
        if season.lower() == "summer":
            if temp > 25 and humidity > 60:
                crop = "Rice"
            else:
                crop = "Maize"
        elif season.lower() == "winter":
            if temp < 15:
                crop = "Wheat"
            else:
                crop = "Barley"
        elif season.lower() == "rainy":
            crop = "Rice" if rain > 3 else "Sorghum"

        return {
            "location": location,
            "season": season,
            "best_crop": crop,
            "weather_conditions": {
                "temperature": temp,
                "humidity": humidity,
                "rainfall": rain
            }
        }

    except requests.exceptions.RequestException:
        raise HTTPException(status_code=502, detail="Weather service unavailable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
