import {
  Box,
  Button,
  CardMedia,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    email: "test@testing.in",
    password: "123456",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData);
    if (response) navigate("/dashboard");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [error]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", md: "30%" },
            height: { xs: "max-content", md: "max-content" },
            bgcolor: "white",
            padding: { xs: "1.5rem", md: "2rem" },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: "60px",
              width: "100px",
            }}
            image="https://res.cloudinary.com/dnjcut34n/image/upload/v1719151807/misc/thunder_dfdtah.png"
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: "monospace",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "monospace",
              color: "gray",
              fontWeight: "300",
            }}
          >
            Please enter your credentials to login
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "1rem 0",
              gap: "1rem",
            }}
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={"test@testing.in"}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={"123456"}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Box>

          <Button
            sx={{
              fontFamily: "monospace",
              backgroundColor: "var(--secondary-color)",
              color: "black",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
                boxShadow: "0 0 10px var(--secondary-color)",
              },
            }}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "monospace",
              color: "gray",
              fontWeight: "300",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </motion.div>
  );
};

export default Login;
