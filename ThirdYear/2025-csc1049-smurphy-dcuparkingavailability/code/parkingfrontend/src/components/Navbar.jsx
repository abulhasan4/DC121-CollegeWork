import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the auth token from cookies
    setUser(null); // Clear user data
    navigate("/login"); // Redirect to login page
    if (onLogout) onLogout(); // Call the onLogout prop if needed
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DCU PARKING AVAILABILITY APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>

            {loading ? null : user ? (
              <>
                {user.isManager ? (
                  <>
                    <Link className="nav-link" to="/managerDashboard">
                      Manager Dashboard
                    </Link>
                    <Link className="nav-link" to="/managerparking-spaces">
                      Manage Parking
                    </Link>
                    <Link className="nav-link" to="/parkingViolations">
                      Violations
                    </Link>
                    <Link className="nav-link" to="/manageUsers">
                      Users
                    </Link>
                    <Link className="nav-link" to="/create-parking-area">
                      Add Parking
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/UserDashboard">
                      Dashboard
                    </Link>
                    <Link className="nav-link" to="/parking-spaces">
                      Parking Spaces
                    </Link>
                    <Link className="nav-link" to="/parking-violation">
                      Report Violation
                    </Link>
                  </>
                )}

                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
