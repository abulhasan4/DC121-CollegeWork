import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to DCU Parking Availability App</h1>
      <p>Find and manage your parking spaces efficiently!</p>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light shadow p-3">
            <h5 className="card-title text-center mb-3">Already have an account?</h5>
            <div className="text-center">
              <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-light shadow p-3">
            <h5 className="card-title text-center mb-3">Don't have an account?</h5>
            <div className="text-center">
              <Link to="/register" className="btn btn-success btn-lg">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
