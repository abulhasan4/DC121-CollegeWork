import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

//import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import ParkingSpaces from "./components/ParkingSpaces";
import ParkingLocation from "./components/ParkingLocation";
import EditProfile from "./components/EditProfile";
import ParkingViolation from "./components/ParkingViolation";
import RegisterManagerForm from "./components/RegisterManager";
import ManagerDashboard from "./components/ManagerDashboard.";
import ViewParkingViolations from "./components/ViewParkingViolation";
import ManageUsers from "./components/ManageUsers";
import ManageParkingArea from "./components/ManageParkingArea";
import ManagerParkingLocation from "./components/ManagerParkingLocation";
import ManagerParkingSpaces from "./components/ManagerParkingSpaces";
import AnalyticsPage from "./components/AnalyticsPage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setAuth={setIsAuthenticated} />}
        />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/parking-spaces" element={<ParkingSpaces />} />
        <Route path="/managerparking-spaces" element={<ManagerParkingSpaces />} />
        <Route path="/manager/carpark/:id" element={<ManagerParkingLocation />} />
        <Route path="/carPark/:id" element={<ParkingLocation />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/parking-violation" element={<ParkingViolation />} />
        <Route path="/registerManager" element= {<RegisterManagerForm/>} />
        <Route path="/managerDashboard" element= {<ManagerDashboard/>} />
        <Route path="/parkingViolations" element= {<ViewParkingViolations/>} />
        <Route path="/manageUsers" element = {<ManageUsers/>} />
        <Route path="/create-parking-area" element={<ManageParkingArea />} />
        <Route path="/analytics" element={<AnalyticsPage/>} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
