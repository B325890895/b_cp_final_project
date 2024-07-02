import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Connect from "./pages/Connect";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import HMO from "./pages/HMO";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import NavBar from "./components/NavBar";
import Clients from "./pages/Clients";
import CreateProfile from "./pages/CreateProfile";
import ViewClient from "./pages/ViewClient"
function Router() {
  const [userState, setUserState] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (localStorage.getItem("userState")) {
      setUserState(localStorage.getItem("userState"));
    }
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect" element={<Connect setUserId={setUserId} setUserState={setUserState} />} />
          <Route path="/createProfile" element={<CreateProfile userState={userState} />} />
          <Route element={<NavBar  userId={userId} userState={userState} />}>
            <Route path="/home" element={<Home userId={userId} userState={userState} />} />
            <Route path="/profile/:id" element={<Profile  userState={userState} />} />
            <Route path="/calendar/:id" element={<Calendar  userState={userState} />} />
            <Route path="/hmo" element={<HMO userId={userId} userState={userState} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/clients" element={<Clients userState={userState} />} />
            <Route path="/clients/:id" element={<ViewClient userState={userState} />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
