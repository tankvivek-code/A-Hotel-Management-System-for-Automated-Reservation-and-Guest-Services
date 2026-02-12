import { useEffect, useState } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          Today Check-Ins
          <p className="text-2xl font-bold">{stats.todayCheckIns}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          Today Check-Outs
          <p className="text-2xl font-bold">{stats.todayCheckOuts}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
