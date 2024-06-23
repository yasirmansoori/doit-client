import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  // Retrieve the selected value from localStorage when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem("bottomNavigationValue");
    if (savedValue !== null) {
      setValue(parseInt(savedValue, 10));
    }
  }, []);

  // Save the selected value to localStorage whenever it changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("bottomNavigationValue", newValue);

    // Navigate to the corresponding route
    if (newValue === 0) {
      navigate("/dashboard");
    } else if (newValue === 1) {
      console.log("Recover Tasks");
      // navigate("/recover");
    }
  };

  return (
    <Paper
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        maxHeight: "56px",
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
        <BottomNavigationAction
          disabled
          label="Recover Tasks"
          icon={<DeleteForeverIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
