import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../Component/PrimaryButton";
import Primaryinput from "../Component/Primaryinput";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>

        <div className="space-y-4">
          <Primaryinput
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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

        <PrimaryButton text="Register" type="submit" className="w-full mt-6" />

        <p className="text-sm text-center mt-6 text-slate-600">
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
