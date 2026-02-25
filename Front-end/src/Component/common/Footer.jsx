import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">MyApp</h2>
          <p className="mt-3 text-sm text-slate-600">
            A modern MERN stack platform designed with clean UI and scalable
            architecture.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link className="hover:text-blue-600 transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600 transition" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600 transition" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-600 transition" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Support</h3>
          <ul className="space-y-2 text-slate-600">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Contact</h3>
          <p className="text-slate-600">support@myapp.com</p>
          <p className="text-slate-600">+91 98765 43210</p>
        </div>
      </div>

      <div className="text-center py-4 text-sm border-t text-slate-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
