import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    vehicleRegNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("authToken");

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        setUser(response.data);
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          vehicleRegNumber: response.data.vehicleRegNumber || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8000/api/users/me/",
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage("✅ Profile updated successfully!");
      setError(""); 
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("❌ Failed to update profile. Please try again.");
      setMessage("");
    }
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4">✏️ Edit Profile</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vehicle Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="vehicleRegNumber"
                value={formData.vehicleRegNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="success" type="submit">✅ Save Changes</Button>
              <Button variant="secondary" href="/UserDashboard">⬅️ Back to Dashboard</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;


