import { CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PropTypes from "prop-types";

const SideBar = ({ width }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    localStorage.setItem("selectedButton", button);
    if (button === "tasks") {
      navigate("/dashboard");
    } else {
      navigate("/recover");
    }
  };

  // Retrieve the selected button from localStorage when the component mounts
  useEffect(() => {
    const savedButton = localStorage.getItem("selectedButton");
    if (savedButton) {
      setSelectedButton(savedButton);
    }
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        width: width,
        backgroundColor: "white",
        padding: "1rem",
        borderRight: "1px solid lightgray",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "100",
      }}
    >
      {/* logo  */}
      <CardMedia
        component="img"
        image="https://res.cloudinary.com/dnjcut34n/image/upload/v1719151807/misc/thunder_dfdtah.png"
        alt="logo"
        sx={{
          objectFit: "contain",
          height: "50px",
          width: "80px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "monospace",
          fontWeight: "bold",
          marginTop: "1rem",
          letterSpacing: "2px",
        }}
      >
        MENU
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <Tooltip title="Tasks" placement="right">
          <IconButton
            sx={{
              color: "black",
              backgroundColor: selectedButton === "tasks" ? "#D3D3D3" : "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor:
                  selectedButton === "tasks" ? "#D3D3D3" : "white",
              },
            }}
            onClick={() => handleButtonClick("tasks")}
          >
            <AssignmentIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Recover Tasks" placement="right">
          <IconButton
            disabled
            sx={{
              color: "black",
              backgroundColor:
                selectedButton === "recover" ? "#E8E8E8" : "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor:
                  selectedButton === "recover" ? "#E8E8E8" : "white",
              },
            }}
            onClick={() => handleButtonClick("recover")}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SideBar;

SideBar.propTypes = {
  width: PropTypes.string,
};
