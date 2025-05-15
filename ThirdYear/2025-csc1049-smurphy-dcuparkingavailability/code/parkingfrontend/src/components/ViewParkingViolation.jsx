import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Card, Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewParkingViolations = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get("http://localhost:8000/api/parkingviolation/", {
          headers: { Authorization: `Token ${token}` },
        });
        setViolations(response.data);
      } catch (error) {
        console.error("Error fetching violations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  const handleConfirm = async (violation) => {
    try {
      const token = Cookies.get("authToken");
      const userId = violation.loggedBy.split("/").filter(Boolean).pop();
      await axios.patch(
        `http://localhost:8000/api/parking/${violation.parkingSpace}/confirm-violation/`,
        { reservedBy: userId },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await axios.delete(`http://localhost:8000/api/parkingviolation/${violation.violationId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setViolations((prevViolations) =>
        prevViolations.filter((v) => v.violationId !== violation.violationId)
      );
      setMessage("Violation confirmed, and space is now occupied.");
    } catch (error) {
      console.error("Error confirming violation:", error);
      setMessage("Failed to confirm violation. Try again.");
    }
  };

  const handleDiscard = async (violation) => {
    try {
      const token = Cookies.get("authToken");
      await axios.delete(`http://localhost:8000/api/parkingviolation/${violation.violationId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setViolations((prevViolations) =>
        prevViolations.filter((v) => v.violationId !== violation.violationId)
      );
      setMessage("Violation report discarded.");
    } catch (error) {
      console.error("Error discarding violation:", error);
      setMessage("Failed to discard violation. Try again.");
    }
  };

  const handleBack = () => {
    navigate("/managerDashboard");
  };

  return (
    <Container className="mt-5 text-center">
      <Button variant="secondary" onClick={handleBack} className="mb-3 d-block mx-auto">🔙 Back to Dashboard</Button>
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4">🚨 Parking Violations</h2>
          {message && <Alert variant="info">{message}</Alert>}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading violations...</p>
            </div>
          ) : violations.length === 0 ? (
            <Alert variant="success">No parking violations reported.</Alert>
          ) : (
            <ListGroup>
              {violations.map((violation) => (
                <ListGroup.Item key={violation.violationId} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Vehicle:</strong> {violation.vehicleNumber} <br />
                    <strong>Reason:</strong> {violation.reason} <br />
                  </div>
                  <div>
                    <Button variant="success" className="me-2" onClick={() => handleConfirm(violation)}>
                      ✅ Confirm & Remove
                    </Button>
                    <Button variant="danger" onClick={() => handleDiscard(violation)}>
                      ❌ Discard
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewParkingViolations;


