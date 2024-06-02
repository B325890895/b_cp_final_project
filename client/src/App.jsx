import React from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import Connect from './pages/Connect';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <Router>
        <Route  path="/" component={LandingPage} />
        
        <Route  path="/profile" component={Profile} />

      
    </Router>
    
    </BrowserRouter>
    {/* <Connect/> */}
    <Profile/>
    </>
  )
}

export default App
