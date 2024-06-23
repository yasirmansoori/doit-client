import {
  Box,
  Button,
  CardMedia,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem 2rem",
          justifyContent: "space-between",
        }}
      >
        {/* logo  */}
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            width: "50px",
          }}
          image="https://res.cloudinary.com/dnjcut34n/image/upload/v1718947883/misc/2_lgle9a.png"
        />
        <Button
          size="small"
          sx={{
            display: { xs: "none", md: "block" },
            color: "white",
            backgroundColor: "black",
            borderRadius: "2rem",
            fontFamily: "monospace",
            padding: "0.5rem 1rem",
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "0px 0px 10px 0px black",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Get started
        </Button>
        {/* Mobile Menu */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            ml: "auto",
          }}
        >
          <IconButton color="black" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem>
              <Button
                variant="text"
                sx={{ width: "100%" }}
                onClick={() => navigate("/login")}
              >
                Get started
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        {/* left side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            width: { xs: "100%", md: "50%" },
            height: { xs: "50%", md: "100%" },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: "400px",
            }}
            image="https://res.cloudinary.com/dnjcut34n/image/upload/v1718947885/misc/bg_nwhtpw.png"
          />
        </Box>

        {/* right side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "monospace",
              color: "black",
              fontWeight: "bold",
              padding: "1rem",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Plan, manage and track
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "monospace",
              color: "black",
              padding: "1rem",
            }}
          >
            Transform your task list into a unique workflow.
          </Typography>
          <Button
            size="small"
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "2rem",
              fontFamily: "monospace",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: "black",
                boxShadow: "0px 0px 10px 0px black",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default LandingPage;
