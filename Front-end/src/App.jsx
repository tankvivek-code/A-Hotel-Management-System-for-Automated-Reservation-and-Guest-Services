import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import ProtectedRoute from "./Component/ProtectedRoute";

import Navbar from "./Component/common/Navbar";
import Footer from "./Component/common/Footer";

/* ===== ADMIN PAGES ===== */
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageRooms from "./Pages/Admin/ManageRooms";

/* ===== CUSTOMER PAGES ===== */
import Home from "./Pages/Customer/Home";
import CustomerPage from "./Pages/Customer/CustomerPage";
import Booking from "./Pages/Customer/Booking";
import Payments from "./Pages/Customer/Payments";

/* ===== COMMON PAGES ===== */
import Services from "./Pages/Services";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ManageUsers from "./Pages/Admin/ManageUsers";
import AdminBookings from "./Pages/Admin/AdminBookings";
import AdminBookRoom from "./Pages/Admin/AdminBookRoom";

const App = () => (
  <>
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

      <Route
        path="/admin/book-room/:userId"
        element={
          <ProtectedRoute role="admin">
            <AdminBookRoom />
          </ProtectedRoute>
        }
      />
    </Routes>

    <Footer />
  </>
);

export default App;
