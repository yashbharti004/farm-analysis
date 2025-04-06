import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

function CropRecommendation() {
  // State for input data
  const [inputData, setInputData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  // State for recommended crop
  const [recommendedCrop, setRecommendedCrop] = useState(null);

  // State for most beneficial crop
  const [mostBeneficialCrop, setMostBeneficialCrop] = useState(null);

  // State for errors
  const [error, setError] = useState("");

  // Handle input changes for crop data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // Handle crop recommendation
  const handleRecommend = async () => {
    if (!inputData.N || !inputData.P || !inputData.K || !inputData.temperature || !inputData.humidity || !inputData.ph || !inputData.rainfall) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", inputData);
      setRecommendedCrop(response.data.recommended_crop);
    } catch (error) {
      setError("Failed to get crop recommendation. Please check the input data.");
      console.error("Error recommending crop:", error);
    }
  };

  // Fetch most beneficial crop
  const fetchMostBeneficialCrop = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/most_beneficial_crop");
      setMostBeneficialCrop(response.data.most_beneficial_crop);
    } catch (error) {
      setError("Failed to fetch most beneficial crop.");
      console.error("Error fetching most beneficial crop:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: "bold", color: "#2E7D32" }}>
        Crop Recommendation System
      </Typography>

      {/* Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Input Crop Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="N"
              label="Nitrogen (N)"
              value={inputData.N}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="P"
              label="Phosphorus (P)"
              value={inputData.P}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="K"
              label="Potassium (K)"
              value={inputData.K}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="temperature"
              label="Temperature (°C)"
              value={inputData.temperature}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="humidity"
              label="Humidity (%)"
              value={inputData.humidity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="ph"
              label="Soil pH"
              value={inputData.ph}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="rainfall"
              label="Rainfall (mm)"
              value={inputData.rainfall}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRecommend}
          style={{ marginTop: "20px" }}
        >
          Recommend Crop
        </Button>
      </div>

      {/* Error Message */}
      {error && <Alert severity="error" style={{ marginBottom: "20px" }}>{error}</Alert>}

      {/* Recommended Crop */}
      {recommendedCrop && (
        <div style={{ marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Recommended Crop
          </Typography>
          <Typography variant="body1" style={{ color: "#4CAF50", fontSize: "18px" }}>
            {recommendedCrop}
          </Typography>
        </div>
      )}

      {/* Most Beneficial Crop */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Most Beneficial Crop
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchMostBeneficialCrop}
          style={{ marginBottom: "10px" }}
        >
          Get Most Beneficial Crop
        </Button>
        {mostBeneficialCrop && (
          <Typography variant="body1" style={{ color: "#008CBA", fontSize: "18px" }}>
            {mostBeneficialCrop}
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default CropRecommendation;