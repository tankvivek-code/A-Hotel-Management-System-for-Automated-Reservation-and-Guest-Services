import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import ProtectedRoute from "./Component/ProtectedRoute";

import Navbar from "./Component/common/Navbar";
import Footer from "./Component/common/Footer";

/* ===== ADMIN PAGES ===== */
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageRooms from "./Pages/Admin/ManageRooms";
import ManageUsers from "./Pages/Admin/ManageUsers";
import AdminBookings from "./Pages/Admin/AdminBookings";

/* ===== MANAGER PAGES ===== */
import ManagerLayout from "./Pages/Manager/ManagerLayout";
import ManagerDashboard from "./Pages/Manager/ManagerDashboard";
import ManagerCheckIns from "./Pages/Manager/ManagerCheckIns";
import ManagerCheckOuts from "./Pages/Manager/ManagerCheckOuts";
import ManagerRooms from "./Pages/Manager/ManagerRooms";

/* ===== CUSTOMER PAGES ===== */
import Home from "./Pages/Customer/Home";
import CustomerPage from "./Pages/Customer/CustomerPage";
import Booking from "./Pages/Customer/Booking";
import Payments from "./Pages/Customer/Payments";

/* ===== COMMON PAGES ===== */
import Services from "./Pages/Services";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ManagerUsers from "./Pages/Manager/ManagerUsers";
import ManagerBookings from "./Pages/Manager/ManagerBookings";

const App = () => (
  <>
    {/* 🔝 COMMON HEADER */}
    <Navbar />

    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* ================= CUSTOMER ROUTES ================= */}
      <Route
        path="/customerPage"
        element={
          <ProtectedRoute role="user">
            <CustomerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute role="user">
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute role="user">
            <Payments />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoute role="admin">
            <ManageRooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute role="admin">
            <AdminBookings />
          </ProtectedRoute>
        }
      />

      {/* ================= MANAGER ROUTES ================= */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute role={["manager", "admin"]}>
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ DEFAULT PAGE */}
        <Route index element={<ManagerDashboard />} />

        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="checkins" element={<ManagerCheckIns />} />
        <Route path="checkouts" element={<ManagerCheckOuts />} />
        <Route path="rooms" element={<ManagerRooms />} />
        <Route path="users" element={<ManagerUsers />} />
        <Route path="bookings" element={<ManagerBookings />} />
      </Route>
    </Routes>

    {/* 🔻 COMMON FOOTER */}
    <Footer />
  </>
);

export default App;
