import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// Import farming-related images
import farmingImage1 from "./images/farming1.jpg";
import farmingImage2 from "./images/farming2.jpg";
import farmingImage3 from "./images/farming3.jpg";
import { colors } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      {/* Welcome Section */}
      <Typography variant="h2" gutterBottom align="center" style={{ fontWeight: "bold", color: "#1F7D53" }}>
        Welcome to the Farm Analysis System
      </Typography>
      <Typography variant="h6" gutterBottom align="center" style={{ color: "#2973B2" }}>
        Analyze plant diseases, check weather conditions, and get the best crop suggestions for your farm.
      </Typography>

      {/* Navigation Buttons */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: "90px" }}>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/disease-detection" style={{ padding: "15px 30px", fontSize: "16px" }}>
            Disease Detection
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/weather-prediction" style={{ padding: "15px 30px", fontSize: "16px" }}>
            Weather Prediction
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/best-crop" style={{ padding: "15px 30px", fontSize: "16px" }}>
            Best Crop Suggestion
          </Button>
        </Grid>
      </Grid>

      {/* Farming Tips Section */}
      <Typography variant="h4" gutterBottom align="center" style={{ marginTop: "50px", fontWeight: "bold", color: "#2E7D32" }}>
        Farming Tips Based on Weather
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={farmingImage1}
              alt="Farming in sunny weather"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sunny Weather
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Ensure proper irrigation to prevent drought stress.
                <br />
                - Use shade nets to protect crops from excessive heat.
                <br />
                - Apply mulch to retain soil moisture.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={farmingImage2}
              alt="Farming in rainy weather"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rainy Weather
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Ensure proper drainage to avoid waterlogging.
                <br />
                - Use fungicides to prevent fungal diseases.
                <br />
                - Plant crops that thrive in wet conditions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={farmingImage3}
              alt="Farming in cold weather"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cold Weather
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Use greenhouses to protect crops from frost.
                <br />
                - Plant cold-resistant crops like wheat and barley.
                <br />
                - Apply organic mulch to insulate the soil.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action Section */}
      <Typography variant="h5" gutterBottom align="center" style={{ marginTop: "50px", fontWeight: "bold", color: "#2E7D32" }}>
        Ready to Optimize Your Farming?
      </Typography>
      <Typography variant="body1" gutterBottom align="center" style={{ color: "#4CAF50" }}>
        Use our tools to analyze plant diseases, predict weather, and get the best crop suggestions for your farm.
      </Typography>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" component={Link} to="/disease-detection" style={{ padding: "15px 30px", fontSize: "16px" }}>
          Get Started
        </Button>
      </Grid>
    </Container>
  );
}

export default Home;