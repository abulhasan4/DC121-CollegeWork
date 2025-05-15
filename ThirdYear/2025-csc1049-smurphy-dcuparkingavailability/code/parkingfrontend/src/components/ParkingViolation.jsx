import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

const ParkingViolation = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    reason: "",
    parkingSpace: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parkingSpaces, setParkingSpaces] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get("http://localhost:8000/api/users/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.data) {
          setUser(response.data);
          console.log("Fetched user data:", response.data);
        } else {
          setError("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchParkingSpaces = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get("http://localhost:8000/api/parking/", {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.data) {
          setParkingSpaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching parking spaces:", error);
        setError("Error fetching parking spaces.");
      }
    };

    fetchUser();
    fetchParkingSpaces();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("authToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    if (!formData.parkingSpace) {
      setError("Please select a parking space.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/parkingviolation/",
        {
          ...formData,
          loggedBy: `http://localhost:8000/api/users/${user.id}/`,
          parkingSpace: parseInt(formData.parkingSpace), // Convert to int
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Violation logged successfully!");
      setError(""); // Clear any errors
      setFormData({ vehicleNumber: "", reason: "", parkingSpace: "" });
    } catch (error) {
      console.error("Error logging violation:", error.response?.data || error);
      setError("❌ Failed to log violation. Please try again.");
      setMessage(""); // Clear success message if there's an error
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4">🚨 Log Parking Violation</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading user data...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reason for Violation:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </Form.Group>

              {/* Parking Space Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label>Parking Space:</Form.Label>
                <Form.Select
                  name="parkingSpace"
                  value={formData.parkingSpace}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Parking Space</option>
                  {parkingSpaces.map((space) => (
                    <option key={space.spaceId} value={space.spaceId}>
                      {space.locationDetails} - {space.spaceId}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button variant="danger" type="submit">
                  🚨 Submit Violation
                </Button>
                <Button variant="secondary" href="/UserDashboard">
                  ⬅️ Back to Dashboard
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ParkingViolation;




