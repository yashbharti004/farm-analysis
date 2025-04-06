// src/pages/AuthPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { Button, TextField, Typography, Paper, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleEmailLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          style={{ margin: "1rem 0" }}
        >
          Sign In
        </Button>
      </form>
      
      <Divider style={{ margin: "1rem 0" }}>OR</Divider>
      
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
    </Paper>
  );
}

export default AuthPage;