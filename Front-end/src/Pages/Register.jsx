import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../Component/PrimaryButton";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <PrimaryButton text="Register" type="submit" />

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
