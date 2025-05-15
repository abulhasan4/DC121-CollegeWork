import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ParkingLocation = () => {
  const { id } = useParams();
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [endTime, setEndTime] = useState(""); 
  const token = Cookies.get("authToken");
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      console.error("User not authenticated. Redirecting to login.");
      navigate("/login");
      return;
    }
  
    const fetchData = async () => {
      await fetchUser();
      await fetchParkingSpaces();
    };
  
    fetchData(); 
  
    const interval = setInterval(fetchParkingSpaces, 10000); 
    return () => clearInterval(interval);
  }, [id, token, navigate]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/me", {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchParkingSpaces = async () => {
    try {
      const parkingResponse = await axios.get("http://localhost:8000/api/parking/", {
        headers: { Authorization: `Token ${token}` },
      });
  
      const reservationResponse = await axios.get("http://localhost:8000/api/reservation/", {
        headers: { Authorization: `Token ${token}` },
      });
  
      const activeReservations = reservationResponse.data.filter(reservation => reservation.isActive);
  
      const locationFilteredSpaces = parkingResponse.data.filter(space => space.locationDetails === id);
  
      const spacesWithReservations = locationFilteredSpaces.map(space => {
        const activeReservation = activeReservations.find(res => res.space === space.spaceId);
        return {
          ...space,
          activeEndTime: activeReservation ? activeReservation.endTime : null,
        };
      });
  
      setParkingSpaces(spacesWithReservations);
    } catch (error) {
      console.error("Error fetching parking spaces or reservations:", error);
    }
  };
  
  
  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setMessage("");
  };

  const closeModal = () => {
    setSelectedSpace(null);
    setMessage("");
  };

  const handleReserve = async () => {
    if (!selectedSpace || !token || !endTime) {
      setMessage("Please enter an end time before reserving.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    const localDateTime = new Date(`${today}T${endTime}`);
    const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);
    const formattedEndTime = utcDateTime.toISOString();
  
    setLoading(true);
    try {
      const reserveResponse = await axios.patch(
        `http://localhost:8000/api/parking/${selectedSpace.spaceId}/reserve/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const reservationResponse = await axios.post(
        "http://localhost:8000/api/reservation/",
        {
          space: selectedSpace.spaceId,
          startTime: new Date().toISOString(),
          endTime: formattedEndTime,
          isActive: true,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setParkingSpaces((prevSpaces) =>
        prevSpaces.map((space) =>
          space.spaceId === selectedSpace.spaceId ? reserveResponse.data : space
        )
      );
      setSelectedSpace(reserveResponse.data);
      setMessage("Reservation successful!");
      setEndTime(""); 
    } catch (error) {
      console.error("Error reserving parking space:", error.response?.data || error.message);
      setMessage("Failed to reserve parking space.");
    }
  
    setLoading(false);
  };
  
  const handleUnreserve = async () => {
    if (!selectedSpace || !token) return;
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/parking/${selectedSpace.spaceId}/reserve/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reservationResponse = await axios.patch(
        `http://localhost:8000/api/reservation/space/${selectedSpace.spaceId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setParkingSpaces((prevSpaces) =>
        prevSpaces.map((space) =>
          space.spaceId === selectedSpace.spaceId ? response.data : space
        )
      );
      setSelectedSpace(response.data);
    } catch (error) {
      console.error("Error unreserving parking space:", error.response?.data || error.message);
    }
    setLoading(false);
  };



  const handleReportViolation = async () => {
    if (!selectedSpace || !token || !user) return;

    const reason = `Violation at ${selectedSpace.locationDetails}, Spot ${selectedSpace.spaceId}`;

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/parkingviolation/",
        {
          vehicleNumber: "None",
          reason: reason,
          loggedBy: `http://localhost:8000/api/users/${user.id}/`,
          parkingSpace: selectedSpace.spaceId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Violation reported successfully!");
    } catch (error) {
      console.error("Error reporting violation:", error.response?.data || error.message);
      setMessage("Failed to report violation. Please try again.");
    }
    setLoading(false);
  };

  const redirectToViolation = () => {
  navigate("/parking-violation", { state: { spaceId: selectedSpace.spaceId } });
};

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Parking Spots at Location {id}</h1>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="row justify-content-center">
        <div className="col-md-8">
          {parkingSpaces.length > 0 ? (
            <ul className="list-group">
              {parkingSpaces.map((space) => (
               <li
               key={space.spaceId}
               className={`list-group-item d-flex justify-content-between align-items-center ${
                 space.status === "occupied"
                   ? "list-group-item-danger"  
                   : space.status === "reserved"
                   ? "list-group-item-warning disabled" 
                   : space.type === "handicap"
                   ? "list-group-item-info"  
                   : space.type === "electric"
                   ? "list-group-item-success" 
                   : "list-group-item-light"
               }`}
               onClick={space.status === "reserved" ? null : () => handleSpaceClick(space)}
               style={{
                 cursor: space.status === "reserved" ? "not-allowed" : "pointer",
                 opacity: space.status === "reserved" ? 0.6 : 1,
               }}
             >
               <strong>Spot {space.spaceId} ({space.type})</strong>
               <span
                 className={`badge ${
                   space.status === "occupied"
                     ? "bg-danger"   
                     : space.status === "reserved"
                     ? "bg-warning"  
                     : space.type === "handicap"
                     ? "bg-info" 
                     : space.type === "electric"
                     ? "bg-success" 
                     : "bg-secondary" 
                 }`}
               >
                 {space.status}
               </span>
             </li> 
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center">No parking spots available at this location.</p>
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}
      {selectedSpace && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Parking Space Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                  <p><strong>ID:</strong> {selectedSpace.spaceId}</p>
                  <p><strong>Type:</strong> {selectedSpace.type}</p>
                  <p><strong>Status:</strong> {selectedSpace.status}</p>
                  <p><strong>Location:</strong> {selectedSpace.locationDetails}</p>

                  {/* Show expected end time if the space is occupied and has an active reservation */}
                  {selectedSpace.status === "occupied" && selectedSpace.activeEndTime && (
                    <p><strong>Expected End Time:</strong> {new Date(selectedSpace.activeEndTime).toLocaleString()}</p>
                  )}

                  {/* Input for End Time when reserving */}
                  {selectedSpace.status !== "occupied" && (
                    <div className="mb-3">
                      <label className="form-label">Expected End Time:</label>
                      <input
                        type="time"
                        className="form-control"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  )}

                  {message && <div className="alert alert-success">{message}</div>}
                </div>
              <div className="modal-footer">
                {selectedSpace.status !== "occupied" ? (
                  <button onClick={handleReserve} className="btn btn-success me-2" disabled={loading}>
                    {loading ? "Reserving..." : "Reserve"}
                  </button>
                ) : (
                  <button onClick={handleUnreserve} className="btn btn-warning me-2" disabled={loading}>
                    {loading ? "Unreserving..." : "Unreserve"}
                  </button>
                )}

                {/* Only show "Report Violation" if the space is occupied */}
                {selectedSpace.status === "occupied" && (
                  <button onClick={handleReportViolation} className="btn btn-danger me-2" disabled={loading}>
                    {loading ? "Reporting..." : "Report Empty Space"}
                  </button>
                )}

                {selectedSpace.status === "occupied" && (
                  <button onClick={redirectToViolation} className="btn btn-danger me-2" disabled={loading}>
                    {loading ? "Reporting..." : "Report Violation "}
                  </button>
                )}

                <button onClick={closeModal} className="btn btn-secondary">
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingLocation;

