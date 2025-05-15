import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    isManager: false,
    vehicleRegNumber: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", formData);

      if (response.data && response.data.token) {
        Cookies.set("authToken", response.data.token, { expires: 7 }); // Store token in cookies
        setSuccess("User registered successfully!");
        navigate("/UserDashboard");
      }
    } catch (err) {
      setErrors(err.response?.data || ["Something went wrong."]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Your DCU Parking Account</h2>

              {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  <strong>Error!</strong> Please correct the following errors:
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password:</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vehicle Registration Number:</label>
                  <input type="text" name="vehicleRegNumber" value={formData.vehicleRegNumber} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-danger btn-block">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;



