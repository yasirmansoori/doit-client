import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "monospace",
          textAlign: "center",
          color: "black",
          padding: "1rem",
          fontWeight: "bold",
          borderTop: "1px solid black",
        }}
      >
        &copy; 2024 All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
