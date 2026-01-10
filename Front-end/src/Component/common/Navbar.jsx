import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PrimaryButton from "../../Component/PrimaryButton";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔑 HOME PATH BASED ON ROLE
  const homePath = !user
    ? "/"
    : user.role === "admin"
    ? "/admin"
    : "/CustomerPage";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white text-slate-800 sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link to={homePath} className="text-2xl font-bold text-slate-900">
          MyApp
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">
          {/* 🔓 PUBLIC / CUSTOMER LINKS */}
          {user?.role !== "admin" && (
            <>
              <Link to={homePath} className="hover:text-slate-600">
                Home
              </Link>
              <Link to="/services" className="hover:text-slate-600">
                Services
              </Link>
              <Link to="/about" className="hover:text-slate-600">
                About
              </Link>
              <Link to="/contact" className="hover:text-slate-600">
                Contact
              </Link>
            </>
          )}

          {/* 🛠 ADMIN ONLY */}
          {user?.role === "admin" && (
            <Link to="/admin" className="font-semibold hover:text-slate-600">
              Admin Panel
            </Link>
          )}

          {/* BEFORE LOGIN */}
          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-slate-400 rounded hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-slate-800 text-white rounded hover:bg-slate-900"
              >
                Register
              </Link>
            </>
          )}

          {/* AFTER LOGIN */}
          {user && (
            <PrimaryButton
              className="cursor-pointer"
              text="Logout"
              onClick={handleLogout}
            />
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-slate-50 border-t px-6 py-4 space-y-4">
          {/* 🔓 PUBLIC / CUSTOMER LINKS */}
          {user?.role !== "admin" && (
            <>
              <Link
                onClick={() => setOpen(false)}
                to={homePath}
                className="block"
              >
                Home
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/services"
                className="block"
              >
                Services
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/about"
                className="block"
              >
                About
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/contact"
                className="block"
              >
                Contact
              </Link>
            </>
          )}

          {/* 🛠 ADMIN ONLY */}
          {user?.role === "admin" && (
            <Link
              onClick={() => setOpen(false)}
              to="/admin"
              className="block font-semibold"
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="block"
              >
                Login
              </Link>
              <Link
                onClick={() => setOpen(false)}
                to="/register"
                className="block font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <PrimaryButton
              className="cursor-pointer"
              text="Logout"
              onClick={handleLogout}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
