import axios from "axios";
import { useEffect, useState } from "react";

const useAnalytics = (token) => {
  const [analyticsData, setAnalyticsData] = useState({
    totalReservationsPerDay: {},
    activeInactiveCount: { active: 0, inactive: 0 },
    avgReservationDuration: 0,
    mostFrequentSpaces: {},
    peakTimes: {},
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reservation/", {
          headers: { Authorization: `Token ${token}` },
        });

        const reservations = response.data;

        // Initialize Metrics
        const totalReservationsPerDay = {};
        let activeCount = 0;
        let inactiveCount = 0;
        let totalDuration = 0;
        let reservationCount = 0;
        const spaceFrequency = {};
        const timeFrequency = {};

        reservations.forEach((res) => {
          const startDate = new Date(res.startTime).toISOString().split("T")[0];
          totalReservationsPerDay[startDate] = (totalReservationsPerDay[startDate] || 0) + 1;

          if (res.isActive) {
            activeCount++;
          } else {
            inactiveCount++;
          }

          // Calculate Duration
          if (res.actualEndTime || res.endTime) {
            const start = new Date(res.startTime);
            const end = new Date(res.actualEndTime || res.endTime);
            const duration = (end - start) / (1000 * 60); // Convert to minutes
            totalDuration += duration;
            reservationCount++;
          }

          // Track Most Reserved Spaces
          spaceFrequency[res.space] = (spaceFrequency[res.space] || 0) + 1;

          // Track Peak Times
          const hour = new Date(res.startTime).getHours();
          timeFrequency[hour] = (timeFrequency[hour] || 0) + 1;
        });

        setAnalyticsData({
          totalReservationsPerDay,
          activeInactiveCount: { active: activeCount, inactive: inactiveCount },
          avgReservationDuration: reservationCount ? totalDuration / reservationCount : 0,
          mostFrequentSpaces: spaceFrequency,
          peakTimes: timeFrequency,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [token]);

  return analyticsData;
};

export default useAnalytics;
