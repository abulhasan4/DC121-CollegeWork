import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Alert, Spinner } from "react-bootstrap";

const ManageParkingArea = () => {
  const [name, setName] = useState("");
  const [numSpaces, setNumSpaces] = useState(0);
  const [error, setError] = useState("");
  const [parkingAreas, setParkingAreas] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("authToken"); // Get auth token

  useEffect(() => {
    fetchParkingAreas();
  }, []);

  const fetchParkingAreas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/carparks/", {
        headers: { Authorization: `Token ${token}` },
      });
      setParkingAreas(response.data);
    } catch (err) {
      setError("Failed to fetch parking areas.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    
    if (!token) {
      setError("You must be logged in to create a parking area.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/carpark/create/",
        { name, num_spaces: numSpaces },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      alert("Parking area created successfully!");
      fetchParkingAreas(); // Refresh the list
      setName("");
      setNumSpaces(0);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create parking area.");
    }
  };

  const handleDelete = async () => {
    if (!selectedParkingArea) {
      setError("Please select a parking area to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/carparks/${selectedParkingArea}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      alert("Parking area deleted successfully!");
      fetchParkingAreas(); // Refresh the list
      setSelectedParkingArea("");
    } catch (err) {
      setError("Failed to delete parking area.");
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading parking areas...</p>
      </Container>
    );
    
    const handleBack = () => {
      navigate("/managerDashboard");
    };
  return (
    <Container className="mt-4 text-center">
      <Button variant="secondary" onClick={handleBack} className="mb-3 d-block mx-auto">🔙 Back to Dashboard</Button>
      <h2 className="mb-4 text-center">Manage Parking Areas</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="p-4 mb-4 shadow-sm">
        <h4>Create Parking Area</h4>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Car Park Name:</Form.Label>
            <Form.Control 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Spaces:</Form.Label>
            <Form.Control 
              type="number"
              value={numSpaces}
              onChange={(e) => setNumSpaces(parseInt(e.target.value, 10))}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">Create</Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h4>Delete Parking Area</h4>
        <Form.Group className="mb-3">
          <Form.Label>Select Parking Area:</Form.Label>
          <Form.Select 
            value={selectedParkingArea}
            onChange={(e) => setSelectedParkingArea(e.target.value)}
          >
            <option value="">-- Select a Parking Area --</option>
            {parkingAreas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </Container>
  );
};

export default ManageParkingArea;
