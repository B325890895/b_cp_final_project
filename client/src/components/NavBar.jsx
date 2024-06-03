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

function NavBar() {
  const navItems = [
    {name: "בית",link: "home"},
    { name: "תשלום", link: "payment" },
    { name: "התחייבות חברת החולים", link: "hmo" },
    { name: "לוח שנה", link: "calendar" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  // return(
  //   <>
  //   <button id="homebtn">
  //   <Link to="/Home">
  //     <i className="fa-solid fa-house"></i>
  //   </Link>
  // </button>
  // <Outlet/>
  // </>
  // )

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
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
              לוגו
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.link} sx={{ color: "#fff" }}>
                  <Link to={item.link.toLowerCase()}>{item.name}</Link>
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
