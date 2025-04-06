// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import DiseaseDetection from "./pages/DiseaseDetection";
import WeatherPrediction from "./pages/WeatherPrediction";
import BestCropSuggestion from "./pages/BestCropSuggestion";
import CropRecommendation from "./pages/cropRecommendation";
import AuthPage from "./pages/AuthPage";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route 
          path="/disease-detection" 
          element={user ? <DiseaseDetection /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/weather-prediction" 
          element={user ? <WeatherPrediction /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/best-crop" 
          element={user ? <BestCropSuggestion /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/crop-recommendation" 
          element={user ? <CropRecommendation /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;