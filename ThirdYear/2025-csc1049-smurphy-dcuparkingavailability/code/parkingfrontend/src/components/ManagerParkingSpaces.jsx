import React, { useEffect, useState } from "react";
import apiClient from "./api";
import { useNavigate } from "react-router-dom";

const ManagerParkingSpaces = () => {
  const [carParks, setCarParks] = useState([]); 
  const [parkingSpaces, setParkingSpaces] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarParks();
    fetchParkingSpaces();
  }, []);

  const fetchCarParks = async () => {
    try {
      const response = await apiClient.get("/carparks/", { withCredentials: true });
      setCarParks(response.data);
    } catch (error) {
      console.error("Error fetching car parks:", error);
    }
  };

  const fetchParkingSpaces = async () => {
    try {
      const response = await apiClient.get("/parking/", { withCredentials: true });
      setParkingSpaces(response.data);
    } catch (error) {
      console.error("Error fetching parking spaces:", error);
    }
  };
  
  const getAvailableSpaces = (carParkId) => {
    return parkingSpaces.filter(space => space.locationDetails === String(carParkId) && space.status === "available").length;
  };

  return (
    <div>
      <h1>Car Parks</h1>
      <div>
        {carParks.map((carPark) => (
          <button 
            key={carPark.id} 
            onClick={() => navigate(`/managerCarPark/${carPark.id}`)}
            style={{ display: "block", margin: "10px", padding: "10px", border: "1px solid black" }}
          >
            {carPark.name} - Available Spaces: {getAvailableSpaces(carPark.id)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManagerParkingSpaces;