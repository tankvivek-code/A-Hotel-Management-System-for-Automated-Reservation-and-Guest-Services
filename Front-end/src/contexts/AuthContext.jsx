import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const API = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // REGISTER
  const register = async (form) => {
    try {
      const res = await axios.post(`${API}/user/register`, form);
      return res.data.message;
    } catch (err) {
      throw err; // 🔥 REQUIRED so Register.jsx can catch it
    }
  };

  // LOGIN
  const login = async (form) => {
    try {
      const res = await axios.post(`${API}/user/login`, form);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT (FIXED)
  const logout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        await axios.post(
          `${API}/user/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 REQUIRED
            },
          }
        );
      }
    } catch (err) {
      console.log("Logout API failed, clearing session anyway");
    } finally {
      localStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
