import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function WeatherPrediction() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8000/weather?location=${location}`);
      setWeatherData(response.data);
    } catch (error) {
      setError("Failed to fetch weather data. Please check the location and try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Weather and Climate
      </Typography>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <Button variant="contained" color="primary" onClick={fetchWeather} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Get Weather"}
      </Button>
      {error && <Alert severity="error" style={{ marginTop: "20px" }}>{error}</Alert>}
      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Weather Data</Typography>
          <Typography>Location: {weatherData.location}</Typography>
          <Typography>Temperature: {weatherData.temperature}°C</Typography>
          <Typography>Humidity: {weatherData.humidity}%</Typography>
          <Typography>Precipitation: {weatherData.precipitation} mm</Typography>
          <Typography>Advisory: {weatherData.advisory}</Typography>
        </div>
      )}
    </Container>
  );
}

export default WeatherPrediction;