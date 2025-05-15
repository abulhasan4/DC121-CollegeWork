import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, ListGroup } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get("http://localhost:8000/api/manage-users/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = Cookies.get("authToken");
      await axios.delete(`http://localhost:8000/api/manage-users/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      setMessage("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Failed to delete user. Try again.");
    }
  };

  const handleBack = () => {
    navigate("/managerDashboard");
  };


  return (
    <Container className="mt-5 text center">
      <Button variant="secondary" onClick={handleBack} className="mb-3 d-block mx-auto">🔙 Back to Dashboard</Button>
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4">👥 Manage Users</h2>
          {message && <Alert variant="info">{message}</Alert>}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <Alert variant="warning">No users found.</Alert>
          ) : (
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Name:</strong> {user.first_name} {user.last_name} <br />
                    <strong>Email:</strong> {user.email}
                  </div>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>
                    ❌ Delete User
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageUsers;
