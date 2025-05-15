import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";

const UserDashboard = () => {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get("http://localhost:8000/api/users/me/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("authToken");
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      Cookies.remove("authToken");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading your dashboard...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4">👋 Welcome, {user.first_name} {user.last_name}!</h2>
          <hr />

          <h4>📌 Your Details</h4>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Vehicle Registration:</strong> {user.vehicleRegNumber || "Not provided"}</li>
          </ul>

          <h4>🅿️ Parking Information</h4>
          <ul className="list-unstyled">
            <li><strong>Reserved Parking:</strong> {user.reserved_parking || "Not reserved"}</li>
            <li><strong>Current Status:</strong> {user.parking_status || "Not available"}</li>
          </ul>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Button variant="primary" href="/edit-profile">✏️ Edit Profile</Button>
            <Button variant="success" href="/parking-spaces">🚗 Book Parking</Button>
            <Button variant="warning" href="/parking-violation">⚠️ Report Violation</Button>
            <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDashboard;


