import React, { useEffect, useState } from "react";
import apiClient from "./api";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";

const ManagerParkingSpaces = () => {
  const [carParks, setCarParks] = useState([]); 
  const [parkingSpaces, setParkingSpaces] = useState([]); 
  const [selectedCarPark, setSelectedCarPark] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 30;
  const token = Cookies.get("authToken");
  const [selectedSpaces, setSelectedSpaces] = useState([]); 
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);
  const [bulkEditData, setBulkEditData] = useState({ status: "", type: "", reservedBy: "" });


  const [showModal, setShowModal] = useState(false);
  const [editSpace, setEditSpace] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCarParks();
    fetchParkingSpaces();
  }, []);

  const fetchCarParks = async () => {
    try {
      const response = await apiClient.get("/carparks/", { headers: { Authorization: `Token ${token}`} });
      setCarParks(response.data);
    } catch (error) {
      console.error("Error fetching car parks:", error);
    }
  };

  const fetchParkingSpaces = async () => {
    try {
      const response = await apiClient.get("/parking/", { headers: { Authorization: `Token ${token}`} });
      setParkingSpaces(response.data);
    } catch (error) {
      console.error("Error fetching parking spaces:", error);
    }
  };

  const handleDelete = async (spaceId) => {
    if (!window.confirm("Are you sure you want to delete this parking space?")) return;

    try {
      await apiClient.delete(`/parking/${spaceId}/`, { headers: { Authorization: `Token ${token}` },});
      alert("Parking space deleted successfully!");
      setParkingSpaces((prevSpaces) => prevSpaces.filter(space => space.spaceId !== spaceId));
    } catch (error) {
      console.error("Error deleting parking space:", error);
      alert("Failed to delete parking space.");
    }
  };

  const handleEdit = (space) => {
    setEditSpace(space);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await apiClient.patch(`/parking/${editSpace.spaceId}/`, editSpace, {  headers: { Authorization: `Token ${token}` },});
      alert("Parking space updated successfully!");

      setParkingSpaces((prevSpaces) =>
        prevSpaces.map((space) => (space.spaceId === editSpace.spaceId ? editSpace : space))
      );

      setShowModal(false);
    } catch (error) {
      console.error("Error updating parking space:", error);
      alert("Failed to update parking space.");
    }
  };

 
  const filteredSpaces = parkingSpaces.filter((space) => {
    return (
      (selectedCarPark === "" || space.locationDetails === selectedCarPark) &&
      (filterStatus === "" || space.status === filterStatus) &&
      (filterType === "" || space.type === filterType)
    );
  });

  const handleBack = () => {
    navigate("/managerDashboard");
  };

  const handleBulkUpdate = async () => {
    if (selectedSpaces.length === 0) {
      alert("No parking spaces selected!");
      return;
    }
  
    try {
      const updateData = {};
      
      if (bulkEditData.status) updateData.status = bulkEditData.status;
      if (bulkEditData.type) updateData.type = bulkEditData.type;
      if (bulkEditData.reservedBy) updateData.reservedBy = bulkEditData.reservedBy;
  
      await apiClient.patch(`/mass-update/`, {
        spaceIds: selectedSpaces, 
        ...updateData,
      }, { headers: { Authorization: `Token ${token}` } });
  
      alert("Parking spaces updated successfully!");
  
      setParkingSpaces((prevSpaces) =>
        prevSpaces.map(space => 
          selectedSpaces.includes(space.spaceId) ? { ...space, ...updateData } : space
        )
      );
  
      setShowBulkEditModal(false);
      setSelectedSpaces([]);
    } catch (error) {
      console.error("Error updating parking spaces:", error);
      alert("Failed to update parking spaces.");
    }
  };
  
  const indexOfLastSpace = currentPage * spacesPerPage;
  const indexOfFirstSpace = indexOfLastSpace - spacesPerPage;
  const currentSpaces = filteredSpaces.slice(indexOfFirstSpace, indexOfLastSpace);
  const totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Car Parks & Parking Spaces</h1>
      <Button variant="secondary" onClick={handleBack} className="mb-3 d-block mx-auto">🔙 Back to Dashboard</Button>
   
      <div className="row mb-4">
        <div className="col-md-4">
          <select className="form-select" value={selectedCarPark} onChange={(e) => setSelectedCarPark(e.target.value)}>
            <option value="">All Parking Areas</option>
            {carParks.map((carPark) => (
              <option key={carPark.id} value={carPark.id}>{carPark.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Standard">Standard</option>
            <option value="Electric">Electric</option>
            <option value="Handicap">Handicap</option>
          </select>
        </div>
      </div>

    {selectedSpaces.length > 0 && (
      <div className="d-flex justify-content-center mb-3">
        <button onClick={() => setShowBulkEditModal(true)} className="btn btn-primary">
        ✏ Mass Edit Selected
        </button>
      </div>
    )}


    
      <h2 className="text-center mt-5">📍 Parking Spaces</h2>
      <table className="table table-hover mt-3">
      <thead className="thead-dark bg-dark text-white">
        <tr>
          <th>
            <input 
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedSpaces(parkingSpaces.map(space => space.spaceId));
                } else {
                  setSelectedSpaces([]);
                }
              }}
              checked={selectedSpaces.length === parkingSpaces.length && parkingSpaces.length > 0}
            />
          </th>
          <th>Space ID</th>
          <th>Status</th>
          <th>Type</th>
          <th>Reserved By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentSpaces.length > 0 ? (
          currentSpaces.map((space) => (
            <tr key={space.spaceId}>
              <td>
                <input 
                  type="checkbox"
                  checked={selectedSpaces.includes(space.spaceId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSpaces([...selectedSpaces, space.spaceId]);
                    } else {
                      setSelectedSpaces(selectedSpaces.filter(id => id !== space.spaceId));
                    }
                  }}
                />
              </td>
              <td>{space.spaceId}</td>
              <td className={
                   space.status === "occupied" 
                   ? "text-danger fw-bold"   
                  : space.status === "reserved" 
                  ? "text-secondary fw-bold" 
                  : "text-success fw-bold" 
                  }>
              {space.status}
              </td>

              <td>{space.type}</td>
              <td>{space.reservedBy ? `User ID: ${space.reservedBy}` : "Not Reserved"}</td>
              <td>
                <button onClick={() => handleEdit(space)} className="btn btn-warning btn-sm me-2">✏ Edit</button>
                <button onClick={() => handleDelete(space.spaceId)} className="btn btn-danger btn-sm">🗑 Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-muted">No parking spaces match your filters.</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Pagination */}
      <div className="pagination d-flex justify-content-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
          >
            {i + 1}
          </button>
        ))}
    </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
      <Modal.Title>✏ Edit Parking Space</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editSpace && (
          <Form>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editSpace.status}
                onChange={(e) => setEditSpace({ ...editSpace, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
              </Form.Select>
            </Form.Group>

  
            <Form.Group className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={editSpace.type}
                onChange={(e) => setEditSpace({ ...editSpace, type: e.target.value })}
              >
                <option value="Standard">Standard</option>
                <option value="Electric">Electric</option>
                <option value="Handicap">Handicap</option>
              </Form.Select>
            </Form.Group>

     
            <Form.Group className="mt-3">
              <Form.Label>Reserved By (User ID)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User ID or leave empty for 'Not Reserved'"
                value={editSpace.reservedBy || ""}
                onChange={(e) => setEditSpace({ ...editSpace, reservedBy: e.target.value || null })}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
      </Modal.Footer>
    </Modal>

  <Modal show={showBulkEditModal} onHide={() => setShowBulkEditModal(false)}>
  <Modal.Header closeButton>
  <Modal.Title>✏ Mass Edit Parking Spaces</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>

      <Form.Group>
        <Form.Label>Status (leave blank to keep unchanged)</Form.Label>
        <Form.Select
          value={bulkEditData.status}
          onChange={(e) => setBulkEditData({ ...bulkEditData, status: e.target.value })}
        >
          <option value="">No Change</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Type (leave blank to keep unchanged)</Form.Label>
        <Form.Select
          value={bulkEditData.type}
          onChange={(e) => setBulkEditData({ ...bulkEditData, type: e.target.value })}
        >
          <option value="">No Change</option>
          <option value="Standard">Standard</option>
          <option value="Electric">Electric</option>
          <option value="Handicap">Handicap</option>
        </Form.Select>
      </Form.Group>
      
      <Form.Group className="mt-3">
        <Form.Label>Reserved By (User ID, leave blank to keep unchanged)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter User ID or leave empty"
          value={bulkEditData.reservedBy}
          onChange={(e) => setBulkEditData({ ...bulkEditData, reservedBy: e.target.value })}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowBulkEditModal(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleBulkUpdate}>Save Changes</Button>
  </Modal.Footer>
  </Modal>


    </div>
  );
};

export default ManagerParkingSpaces;




