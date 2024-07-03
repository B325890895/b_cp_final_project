// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Drawer from '@mui/material/Drawer';
// import Button from "@mui/material/Button";
// import { Link, Outlet } from "react-router-dom";
// import "./components_css/NavBar.css";
// import { useNavigate } from "react-router-dom";

// function NavBar({ userId, userState }) {
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navItemsClient = [
//     { name: "בית", link: "home" },
//     // { name: "תשלום", link: "payment" },
//     // { name: "התחייבות חברת החולים", link: "hmo/" },
//     { name: "לוח שנה", link: `calendar/${userId}` },
//     { name: "אזור אישי", link: `profile/${userId}` },
//   ];
//   const navItemsManager = [
//     { name: "בית", link: "home" },
//     // { name: "צפיה בקבלות", link: "payment" },
//     { name: "צפיה בלקוחות", link: "clients" },
//     { name: "לוח שנה", link: `calendar/${userId}` },
//     // { name: "אזור אישי", link: "profile" },
//   ];
//   let navItems = null;

//   switch (userState) {
//     case "manager":
//       navItems = navItemsManager;
//       break;
//     case "client":
//       navItems = navItemsClient;
//       break;
//     default:
//       navItems = null;
//       navigate("/*");
//       break;
//   }

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         <img
//           id="logoWithText"
//           src="../src/assets/logoWithText.jpg"
//           alt="logo with text"
//           style={{ width: '100px' }}
//         />
//       </Typography>
//       <Box>
//         {navItems &&
//           navItems.map((item) => (
//             <Button key={item.link} sx={{ color: "black" }}>
//               <Link
//                 to={item.link.toLowerCase()}
//                 style={{
//                   color: "black",
//                   textDecoration: "none",
//                 }}
//               >
//                 {item.name}
//               </Link>
//             </Button>
//           ))}
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       <Box sx={{ display: "flex" }} dir="rtl">
//         <CssBaseline />
//         <AppBar
//           component="nav"
//           sx={{ backgroundColor: "#aee62d", color: "black" }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//             >
//               <img
//                 id="logoWithText"
//                 src="../src/assets/logoWithText.jpg"
//                 alt="logo with text"
//               />
//             </Typography>
//             <Box sx={{ display: { xs: "none", sm: "block" } }}>
//               {navItems &&
//                 navItems.map((item) => (
//                   <Button key={item.link} sx={{ color: "black" }}>
//                     <Link
//                       to={item.link.toLowerCase()}
//                       style={{
//                         color: "black",
//                         textDecoration: "none",
//                       }}
//                     >
//                       {item.name}
//                     </Link>
//                   </Button>
//                 ))}
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Box component="nav">
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//             sx={{
//               display: { xs: 'block', sm: 'none' },
//               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Outlet />
//       </Box>
//     </>
//   );
// }

// export default NavBar;
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from '@mui/material/Drawer';
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import "./components_css/NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar({ userId, userState }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItemsClient = [
    { name: "בית", link: `home/${userId}`},
    // { name: "תשלום", link: "payment" },
    // { name: "התחייבות חברת החולים", link: "hmo/" },
    { name: "לוח שנה", link: `calendar/${userId}` },
    { name: "אזור אישי", link: `profile/${userId}` },
  ];
  const navItemsManager = [
    { name: "בית", link:  `home/${userId}` },
    // { name: "צפיה בקבלות", link: "payment" },
    { name: "צפיה בלקוחות", link: "clients" },
    { name: "לוח שנה", link: `calendar/${userId}` },
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
      navigate("/*");
      break;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          id="logoWithText"
          src="../src/assets/logoWithText.jpg"
          alt="logo with text"
          style={{ width: '100px' }}
        />
      </Typography>
      <Box>
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
    </Box>
  );

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
        <Box component="main" sx={{ flexGrow: 1, paddingTop: '60px' }}>
          {/* כאן נשים את כל התוכן הראשי של הדף */}
          <Outlet />
        </Box>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default NavBar;

