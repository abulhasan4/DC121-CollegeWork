import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Container, Card, Button, Spinner, Alert, ListGroup } from "react-bootstrap";

const ManagerDashboard = () => {
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

        if (response.data.isManager) {
          setUserData(response.data);
        } else {
          setError("Unauthorized access. You are not a manager.");
        }
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
        {
          headers: { Authorization: `Token ${token}` },
        }
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
          <h2 className="text-center mb-4"> Manager Dashboard</h2>
          <hr />
          <h4>👤 Manager Details</h4>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Name:</strong> {user.first_name} {user.last_name}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
            <ListGroup.Item><strong>Role:</strong> Manager</ListGroup.Item>
          </ListGroup>

          <h4 className="mt-4">🛠️ Manager Actions</h4>
          <ListGroup>
            <ListGroup.Item><strong>View Violations:</strong> <Button variant="primary" href="/parkingViolations" className="ms-2">Go</Button></ListGroup.Item>
            <ListGroup.Item><strong>Manage Parking Spaces:</strong> <Button variant="primary" href="/manager/carpark/1" className="ms-2">Go</Button></ListGroup.Item>
            <ListGroup.Item><strong>Manage Users:</strong> <Button variant="primary" href="/manageUsers" className="ms-2">Go</Button></ListGroup.Item>
            <ListGroup.Item><strong>Edit Parking Areas:</strong> <Button variant="primary" href="/create-parking-area" className="ms-2">Go</Button></ListGroup.Item>
            <ListGroup.Item><strong>View Analytics:</strong> <Button variant="primary" href="/analytics" className="ms-2">Go</Button></ListGroup.Item>
          </ListGroup>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManagerDashboard;
