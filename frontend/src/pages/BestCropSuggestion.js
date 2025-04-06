import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function BestCropSuggestion() {
  const [locationCrop, setLocationCrop] = useState("");
  const [seasonCrop, setSeasonCrop] = useState("");
  const [bestCrop, setBestCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBestCrop = async () => {
    if (!locationCrop || !seasonCrop) {
      setError("Please enter both location and season.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8000/best-crop?location=${locationCrop}&season=${seasonCrop}`);
      setBestCrop(response.data.best_crop);
    } catch (error) {
      setError("Failed to fetch crop suggestion. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Best Crop Suggestion
      </Typography>
      <input
        type="text"
        placeholder="Enter location"
        value={locationCrop}
        onChange={(e) => setLocationCrop(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <input
        type="text"
        placeholder="Enter season (e.g., summer, winter)"
        value={seasonCrop}
        onChange={(e) => setSeasonCrop(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <Button variant="contained" color="primary" onClick={fetchBestCrop} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Get Best Crop"}
      </Button>
      {error && <Alert severity="error" style={{ marginTop: "20px" }}>{error}</Alert>}
      {bestCrop && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Best Crop</Typography>
          <Typography>{bestCrop}</Typography>
        </div>
      )}
    </Container>
  );
}

export default BestCropSuggestion;