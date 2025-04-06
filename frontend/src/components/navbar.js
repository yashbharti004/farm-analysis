// src/components/navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [user] = useAuthState(auth); // Removed unused loading and error
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
        >
          Farm Analysis System
        </Typography>

        {!user && (
          <Button 
            color="inherit" 
            component={Link} 
            to="/auth"
            startIcon={<GoogleIcon />}
            sx={{ marginLeft: 2 }}
          >
            Sign In
          </Button>
        )}

        {user && (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/disease-detection">
              Disease Detection
            </Button>
            <Button color="inherit" component={Link} to="/weather-prediction">
              Weather Prediction
            </Button>
            <Button color="inherit" component={Link} to="/best-crop">
              Best Crop Suggestion
            </Button>
            <Button color="inherit" component={Link} to="/crop-recommendation">
              Crop Recommendation
            </Button>

            <Box sx={{ marginLeft: 2 }}>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                startIcon={
                  user.photoURL ? (
                    <Avatar src={user.photoURL} sx={{ width: 24, height: 24 }} />
                  ) : (
                    <AccountCircleIcon />
                  )
                }
              >
                {user.displayName || "Account"}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  {user.email}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;