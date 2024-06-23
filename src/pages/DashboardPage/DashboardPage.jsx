import Box from "@mui/material/Box";
import SideBar from "./components/SideBar";
import BottomNavigation from "./components/BottomNavigation";
import TaskCardWrapper from "./components/TaskCardWrapper";
import TopBar from "./components/TopBar";
import { useQuery } from "react-query";
import config from "../../config/config.json";

import { taskWrapperData } from "../../misc/misc";

const fetchTasks = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await fetch(`${config.server}/api/task/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return data.data;
};

const Dashboard = () => {
  // React Query for fetching aggregated data
  const { data, error, isLoading, refetch } = useQuery(
    "fetchedTasks",
    fetchTasks,
    {
      staleTime: 5 * 60 * 1000,
      refetchOnMount: true,
      retry: 2,
    }
  );

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
      <BottomNavigation />
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
        <TopBar pageName="Tasks" />

        {/* Task List management */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 1fr" },
            height: { xs: "calc(100% - 192px)", md: "100%" },
            width: "100%",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {/* Task type Card */}
          {data &&
            data?.map((task) => (
              <TaskCardWrapper
                key={task}
                type={task?.type}
                chipBg={task?.bgColor}
                tasks={task?.tasks}
                taskLength={task?.tasks.length}
                isLoading={isLoading}
                refetch={refetch}
              />
            ))}

          {/* Error */}
          {error &&
            taskWrapperData.map((task) => (
              <TaskCardWrapper
                key={task.id}
                type={task.type}
                chipBg={task.bgColor}
                tasks={[]}
                taskLength={0}
                error={error.message}
                refetch={refetch}
              />
            ))}

          {/* Loading */}
          {isLoading &&
            taskWrapperData.map((task) => (
              <TaskCardWrapper
                key={task.id}
                type={task.type}
                chipBg={task.bgColor}
                tasks={[]}
                taskLength={0}
                isLoading={isLoading}
              />
            ))}

          {/* Empty */}
          {data &&
            data.length === 0 &&
            !isLoading &&
            !error &&
            taskWrapperData.map((task) => (
              <TaskCardWrapper
                key={task.id}
                type={task.type}
                chipBg={task.bgColor}
                tasks={[]}
                taskLength={0}
                isLoading={isLoading}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
