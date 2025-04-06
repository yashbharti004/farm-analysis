import React from "react";
import { CircularProgress, Box } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress size={60} />
    </Box>
  );
}

export default LoadingSpinner;