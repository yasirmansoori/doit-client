import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import "./App.css";
import RecoverPage from "./pages/RecoverPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App = () => {
  const { user } = useAuthContext();

  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              user === null ? <LandingPage /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/login"
            element={user === null ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={user === null ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={user === null ? <Navigate to="/" /> : <DashboardPage />}
          />
          <Route
            path="/recover"
            element={user === null ? <Navigate to="/" /> : <RecoverPage />}
          />
        </Routes>
      </QueryClientProvider>
    </Box>
  );
};

export default App;
