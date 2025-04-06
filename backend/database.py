from sqlalchemy import create_engine, Column, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database file
DATABASE_URL = "sqlite:///./plant_diagnosis.db"

# Create database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model
Base = declarative_base()

# Define Diagnosis Model
class PlantDiagnosisDB(Base):
    __tablename__ = "diagnoses"

    id = Column(String, primary_key=True, index=True)  # Primary key
    image_id = Column(String, unique=True, index=True)  # Unique image ID
    diagnosis = Column(String)  # Diagnosis result
    confidence = Column(Float)  # Confidence score
    solution = Column(String)  # Recommended solution

# Define Weather Data Model
class WeatherDataDB(Base):
    __tablename__ = "weather_data"

    id = Column(String, primary_key=True, index=True)  # Primary key
    location = Column(String)  # Location of the weather data
    temperature = Column(Float)  # Temperature in Celsius
    humidity = Column(Float)  # Humidity in percentage
    precipitation = Column(Float)  # Precipitation in mm
    timestamp = Column(DateTime)  # Timestamp of the data

# Create tables in database
Base.metadata.create_all(bind=engine)