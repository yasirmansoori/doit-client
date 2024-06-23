import {
  Box,
  Button,
  CardMedia,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register, error, isLoading } = useRegister();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await register(formData);
    if (response) navigate("/login");
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
              width: "60px",
            }}
            image="https://res.cloudinary.com/dnjcut34n/image/upload/v1718947883/misc/2_lgle9a.png"
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
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Register
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
            Already a member? <Link href="/login">Login</Link>
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

export default SignUpPage;
