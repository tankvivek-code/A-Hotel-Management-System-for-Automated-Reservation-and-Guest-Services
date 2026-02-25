import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../Component/PrimaryButton";
import Primaryinput from "../Component/Primaryinput";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      const role = localStorage.getItem("role");
      navigate(role === "admin" ? "/admin" : "/customerPage");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

        <div className="space-y-4">
          <Primaryinput
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Primaryinput
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <PrimaryButton text="Login" type="submit" className="w-full mt-6" />

        <p className="text-sm text-center mt-6 text-slate-600">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
