import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">MyApp</h2>
          <p className="mt-3 text-sm">
            A clean and modern MERN stack application built for academic and
            real use.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-slate-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-500" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-500" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-500" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Support</h3>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Contact</h3>
          <p>Email: support@myapp.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center py-4 text-sm border-t">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
