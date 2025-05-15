import React, { useEffect, useState } from "react";
import apiClient from "./api";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ParkingSpaces = () => {
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
    return parkingSpaces.filter(
      (space) => space.locationDetails === String(carParkId) && space.status === "available"
    ).length;
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Parking Locations</h1>
      <Row className="g-4">
        {carParks.map((carPark) => (
          <Col key={carPark.id} md={6} lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{carPark.name}</Card.Title>
                <Card.Text className="text-muted">
                  <strong>Available Spaces: </strong>
                  <span className="text-success fw-bold">{getAvailableSpaces(carPark.id)}</span>
                </Card.Text>
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => navigate(`/carpark/${carPark.id}`)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ParkingSpaces;




