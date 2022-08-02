import { Box, CircularProgress, Grid } from "@mui/material";

export const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <CircularProgress />
  </Box>
);
