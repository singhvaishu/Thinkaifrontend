
"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";  
import Home from "../pages/home";  
import Signin from "../pages/login";
import Signup from "../pages/signup";
import PrivateRoute from "../auth/PrivateRoute";  

const App = () => {
  return (
    <Router>
      <div>
   
        <Navbar />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

   
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <div>Dashboard Content</div>
                </PrivateRoute>
              } 
            />
     
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
