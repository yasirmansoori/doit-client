import { Box } from "@mui/material";
import SimpleBottomNavigation from "./DashboardPage/components/BottomNavigation";
import SideBar from "./DashboardPage/components/SideBar";
import TopBar from "./DashboardPage/components/TopBar";

const RecoverPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      {/* sidebar Desktop  */}

      <SideBar width="100px" />
      {/* bottom navigation mobile */}
      <SimpleBottomNavigation />
      {/* main content, Right Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "calc(100% - 100px)" },
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          overflowY: "scroll",
        }}
      >
        {/* Top Bar */}
        <TopBar pageName="Recover" />
        {/* Content */}
        <Box></Box>
      </Box>
    </Box>
  );
};

export default RecoverPage;
