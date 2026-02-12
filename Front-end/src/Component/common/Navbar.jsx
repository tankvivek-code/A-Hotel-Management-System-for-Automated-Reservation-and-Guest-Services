import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PrimaryButton from "../../Component/PrimaryButton";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  /* 🔑 HOME PATH BASED ON ROLE */
  const homePath = !user
    ? "/"
    : user.role === "admin"
      ? "/admin"
      : user.role === "manager"
        ? "/manager/dashboard"
        : "/customerPage"; // ✅ fixed case

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link to={homePath} className="text-2xl font-bold">
          MyApp
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">
          {/* 👤 USER */}
          {user?.role === "user" && (
            <>
              <Link to="/customerPage">Home</Link>
              <Link to="/my-bookings">My Bookings</Link>
            </>
          )}

          {/* 🧑‍💼 MANAGER */}
          {user?.role === "manager" && (
            <>
              <Link to="/manager/dashboard">Dashboard</Link>
              <Link to="/manager/rooms">Rooms</Link>
              <Link to="/manager/users">Users</Link>
              <Link to="/manager/bookings">Bookings</Link>
            </>
          )}

          {/* 👑 ADMIN */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin">Dashboard</Link>
              <Link to="/admin/users">Users</Link>
              <Link to="/admin/rooms">Rooms</Link>
              <Link to="/admin/bookings">Bookings</Link>
            </>
          )}

          {/* 🔓 PUBLIC */}
          {!user && (
            <>
              <Link to="/services">Services</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {/* LOGOUT */}
          {user && <PrimaryButton text="Logout" onClick={handleLogout} />}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-slate-50 px-6 py-4 space-y-3">
          {user?.role === "user" && (
            <>
              <Link to="/customerPage" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/my-bookings" onClick={closeMenu}>
                My Bookings
              </Link>
            </>
          )}

          {user?.role === "manager" && (
            <>
              <Link to="/manager/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/manager/rooms" onClick={closeMenu}>
                Rooms
              </Link>
              <Link to="/manager/users" onClick={closeMenu}>
                Users
              </Link>
              <Link to="/manager/bookings" onClick={closeMenu}>
                Bookings
              </Link>
              <Link to="/manager/payments" onClick={closeMenu}>
                Payments
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/admin/users" onClick={closeMenu}>
                Users
              </Link>
              <Link to="/admin/rooms" onClick={closeMenu}>
                Rooms
              </Link>
              <Link to="/admin/bookings" onClick={closeMenu}>
                Bookings
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}

          {user && <PrimaryButton text="Logout" onClick={handleLogout} />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
