import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:8000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      setError("Failed to analyze the image. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Plant Disease Detection
      </Typography>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: "20px" }} />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Analyze"}
      </Button>
      {error && <Alert severity="error" style={{ marginTop: "20px" }}>{error}</Alert>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Result</Typography>
          <Typography>Diagnosis: {result.diagnosis}</Typography>
          <Typography>Confidence: {result.confidence}</Typography>
          <Typography>Solution: {result.solution}</Typography>
        </div>
      )}
    </Container>
  );
}

export default DiseaseDetection;