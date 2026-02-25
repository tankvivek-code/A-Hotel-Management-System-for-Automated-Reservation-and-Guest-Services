import { useEffect, useState } from "react";
import axios from "axios";

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

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

  if (!stats)
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Manager Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today Check-Ins" value={stats.todayCheckIns} />
        <StatCard title="Today Check-Outs" value={stats.todayCheckOuts} />
      </div>
    </>
  );
};

export default ManagerDashboard;
