import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      
      const loginResponse = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      
      const token = loginResponse.data.token;
      Cookies.set("authToken", token, { expires: 7 });

      const userResponse = await axios.get("http://localhost:8000/api/users/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const isManager = userResponse.data.isManager;
      setAuth(true);

      if (isManager) {
        navigate("/managerDashboard");
      } else {
        navigate("/UserDashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      if (Array.isArray(err.response?.data?.errors)) {
        setErrors(err.response.data.errors);
      } else if (typeof err.response?.data?.message === "string") {
        setErrors([err.response.data.message]);
      } else {
        setErrors(["Invalid login credentials"]);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">DCU Parking Availability Login</h2>
              
              {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  <strong>Error! </strong> Please correct the following errors:
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>
                  <input 
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


