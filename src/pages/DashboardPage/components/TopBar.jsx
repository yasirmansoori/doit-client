import {
  Box,
  Button,
  CardMedia,
  Drawer,
  List,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { style } from "../../../misc/misc";
import PropTypes from "prop-types";
import { useLogout } from "../../../hooks/useLogout";

const TopBar = ({ pageName }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("data"));
    console.log(user);
    setData(user);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 2rem",
          borderBottom: "1px solid lightgray",
        }}
      >
        {/* page name on desktop */}
        <Typography
          sx={{
            display: { xs: "none", md: "block" },
            fontSize: "16px",
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "#000000",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {pageName.toUpperCase()}
        </Typography>
        {/* logo on mobile */}
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dnjcut34n/image/upload/v1718947883/misc/2_lgle9a.png"
          alt="logo"
          sx={{
            objectFit: "contain",
            height: "50px",
            width: "50px",
            cursor: "pointer",
            display: { xs: "block", md: "none" },
          }}
          onClick={() => navigate("/")}
        />
        {/* profile picture, notification  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* profile picture */}
          <Box
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            onClick={toggleDrawer}
          >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/dnjcut34n/image/upload/v1716235100/avatars/uikwxcat1jajc4yhifv9.png"
              alt="profile"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </Box>
          {/* dropdown menu */}
          <KeyboardArrowDownIcon
            sx={{
              display: { xs: "none", md: "block" },
              color: "black",
              cursor: "pointer",
            }}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpenProfileModal}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          sx={{
            display: { xs: "block", md: "none" },
          }}
          anchor="bottom"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <List>
            <ListItem>
              <Button variant="text" sx={{ width: "100%" }}>
                Profile
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="text"
                sx={{ width: "100%" }}
                onclick={handleLogout}
              >
                Logout
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      {/* data display bar  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          borderBottom: "1px solid lightgray",
          padding: "1rem 2rem",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 100,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "24px" },
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          Yasir Mansoori
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "10px", md: "16px" },
            fontFamily: "monospace",
            color: "gray",
          }}
        >
          Developer
        </Typography>
      </Box>
      {/* Profile Modal;  */}
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            Profile
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "monospace",
              marginTop: "1rem",
            }}
          >
            Name: Yasir Mansoori
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
            Email: {data?.email}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
            Joined on: {new Date(data?.joined).toDateString()}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default TopBar;

TopBar.propTypes = {
  pageName: PropTypes.string.isRequired,
};
