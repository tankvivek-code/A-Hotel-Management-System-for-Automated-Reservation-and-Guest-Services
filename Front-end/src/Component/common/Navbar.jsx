import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PrimaryButton from "../../Component/PrimaryButton";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const homePath = !user
    ? "/"
    : user.role === "admin"
      ? "/admin"
      : user.role === "manager"
        ? "/manager/dashboard"
        : "/customerPage";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const closeMenu = () => setOpen(false);

  const linkStyle = "text-slate-700 hover:text-blue-600 transition font-medium";

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to={homePath}
          className="text-2xl font-bold text-slate-900 tracking-wide"
        >
          MyApp
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* ================= USER ================= */}
          {user?.role === "user" && (
            <>
              <Link className={linkStyle} to="/customerPage">
                Book Room
              </Link>
              <Link className={linkStyle} to="/my-bookings">
                My Bookings
              </Link>
            </>
          )}

          {/* ================= MANAGER ================= */}
          {user?.role === "manager" && (
            <>
              <Link className={linkStyle} to="/manager/dashboard">
                Dashboard
              </Link>
              <Link className={linkStyle} to="/manager/rooms">
                Rooms
              </Link>
              <Link className={linkStyle} to="/manager/users">
                Users
              </Link>
              <Link className={linkStyle} to="/manager/bookings">
                Bookings
              </Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {user?.role === "admin" && (
            <>
              <Link className={linkStyle} to="/admin">
                Dashboard
              </Link>
              <Link className={linkStyle} to="/admin/users">
                Users
              </Link>
              <Link className={linkStyle} to="/admin/rooms">
                Rooms
              </Link>
              <Link className={linkStyle} to="/admin/bookings">
                Bookings
              </Link>
            </>
          )}

          {/* ================= PUBLIC (NOT LOGGED IN) ================= */}
          {!user && (
            <>
              <Link className={linkStyle} to="/">
                Home
              </Link>
              <Link className={linkStyle} to="/services">
                Services
              </Link>
              <Link className={linkStyle} to="/about">
                About
              </Link>
              <Link className={linkStyle} to="/contact">
                Contact
              </Link>
              <Link className={linkStyle} to="/login">
                Login
              </Link>
              <Link className={linkStyle} to="/register">
                Register
              </Link>
            </>
          )}

          {/* LOGOUT */}
          {user && (
            <PrimaryButton
              text="Logout"
              onClick={handleLogout}
              className="ml-4"
              variant="danger"
            />
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-slate-800"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3 shadow-md">
          <div className="flex flex-col gap-3 text-slate-700 font-medium">
            {user?.role === "user" && (
              <>
                <Link to="/customerPage" onClick={closeMenu}>
                  Book Room
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

            {user && (
              <PrimaryButton
                text="Logout"
                onClick={handleLogout}
                variant="danger"
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
