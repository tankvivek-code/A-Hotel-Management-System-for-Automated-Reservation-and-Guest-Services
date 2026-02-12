import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminQuickActionCards from "../../Component/common/adminQuickActionCards";

const API = "http://localhost:5000/api/admin/dashboard";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH DASHBOARD STATS ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
        setError(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDashboard();
  }, [token]);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-slate-500">Name</p>
          <p className="font-semibold">{user?.name || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Email</p>
          <p className="font-semibold">{user?.email || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Role</p>
          <p className="font-semibold capitalize">{user?.role || "-"}</p>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <AdminQuickActionCards />

      {/* ================= SYSTEM OVERVIEW ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Rooms" value={stats.totalRooms} />
          <StatCard title="Available Rooms" value={stats.availableRooms} />
          <StatCard title="Booked Rooms" value={stats.bookedRooms} />

          <StatCard title="Total Users" value={stats.totalUsers} />

          <StatCard title="Total Bookings" value={stats.totalBookings} />
          <StatCard title="Active Bookings" value={stats.activeBookings} />

          <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />

          <StatCard title="Today Check-Ins" value={stats.todayCheckIns} />
          <StatCard title="Today Check-Outs" value={stats.todayCheckOuts} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
