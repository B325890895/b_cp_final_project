import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Connect from "./pages/Connect";
import LandingPage from "./pages/LandingPage";
// import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import HMO from "./pages/HMO";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import NavBar from "./components/NavBar";



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect" element={<Connect />} />
          <Route element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/hmo" element={<HMO />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
