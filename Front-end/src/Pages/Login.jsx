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
      navigate(role === "admin" ? "/admin" : "/CustomerPage");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Primaryinput
          type="email"
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Primaryinput
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <PrimaryButton text="Login" type="submit" />

        <p className="text-sm text-center mt-4">
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
