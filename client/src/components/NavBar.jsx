import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import "./components_css/NavBar.css";

function NavBar({ userState }) {
  console.log(userState);
  const navItemsClient = [
    { name: "בית", link: "home" },
    // { name: "תשלום", link: "payment" },
    { name: "התחייבות חברת החולים", link: "hmo" },
    { name: "לוח שנה", link: "calendar" },
    { name: "אזור אישי", link: "profile" },
  ];
  const navItemsManager = [
    { name: "בית", link: "home" },
    // { name: "צפיה בקבלות", link: "payment" },
    { name: "צפיה בלקוחות", link: "clients" },
    { name: "לוח שנה", link: "calendar" },
    // { name: "אזור אישי", link: "profile" },
  ];
  let navItems = null;
  switch (userState) {
    case "manager":
      navItems = navItemsManager;
      break;
    case "client":
      navItems = navItemsClient;
      break;
    default:
      navItems = null;
      break;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box sx={{ display: "flex" }} dir="rtl">
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{ backgroundColor: "#aee62d", color: "black" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                id="logoWithText"
                src="../src/assets/logoWithText.jpg"
                alt="logo with text"
              />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems &&
                navItems.map((item) => (
                  <Button key={item.link} sx={{ color: "black" }}>
                    <Link
                      to={item.link.toLowerCase()}
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </>
  );
}

export default NavBar;
