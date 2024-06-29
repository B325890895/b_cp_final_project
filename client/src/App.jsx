import React,{useState} from "react";
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



function App() {
  const [userState,setUserState]=useState("manager");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect" element={<Connect setUserState={setUserState}/>} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route element={<NavBar userState={userState}/>}>
            <Route path="/home" element={<Home userState={userState}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/hmo" element={<HMO />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/clients" element={<Clients/>}/>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
