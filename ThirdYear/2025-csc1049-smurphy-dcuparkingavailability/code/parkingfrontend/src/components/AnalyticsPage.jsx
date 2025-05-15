/*https://medium.com/@vprince001/creating-dynamic-and-interactive-charts-in-react-using-recharts-18ebab12bd03 */
/*https://www.npmjs.com/package/recharts*/

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import useAnalytics from "./useAnalytics";
import Cookies from "js-cookie";

const AnalyticsPage = () => {
    const token = Cookies.get("authToken");
    const analytics = useAnalytics(token);
    const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  
    useEffect(() => {
      fetch("/api/reservation/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const activeReservations = data.filter((reservation) => reservation.isActive);
          setOccupiedSpaces(activeReservations.length);
        })
        .catch((error) => console.error("Error fetching reservations:", error));
    }, [token]);
  
    const dailyData = Object.keys(analytics.totalReservationsPerDay).map((date) => ({
      date,
      reservations: analytics.totalReservationsPerDay[date],
    }));
  
    const spaceData = Object.keys(analytics.mostFrequentSpaces).map((space) => ({
      space,
      count: analytics.mostFrequentSpaces[space],
    }));
  
    const peakTimeData = Object.keys(analytics.peakTimes).map((hour) => ({
      hour: `${hour}:00`,
      count: analytics.peakTimes[hour],
    }));
  
    return (
      <div className="container py-4">
        <h2 className="text-center mb-4">Parking Reservations Analytics</h2>
  
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow p-3">
              <h5 className="text-center">Total Reservations Per Day</h5>
              <BarChart width={500} height={300} data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservations" fill="#007bff" />
              </BarChart>
            </div>
          </div>
  
          <div className="col-md-6 mb-4">
            <div className="card shadow p-3 text-center">
              <h5>Currently Occupied Spaces</h5>
              <p className="display-4 font-weight-bold">{occupiedSpaces}</p>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow p-3">
              <h5 className="text-center">Most Frequently Reserved Spaces</h5>
              <BarChart width={500} height={300} data={spaceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="space" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#dc3545" />
              </BarChart>
            </div>
          </div>
  
          <div className="col-md-6 mb-4">
            <div className="card shadow p-3">
              <h5 className="text-center">Peak Reservation Times</h5>
              <LineChart width={500} height={300} data={peakTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#007bff" />
              </LineChart>
            </div>
          </div>
        </div>
  
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card shadow p-3">
              <h5>Average Reservation Duration</h5>
              <p className="display-4 font-weight-bold">{analytics.avgReservationDuration.toFixed(2)} min</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AnalyticsPage;

