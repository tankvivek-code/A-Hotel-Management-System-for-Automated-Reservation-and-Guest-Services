import User from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_EXPIRE, REFRESH_EXPIRE } from "../config/jwt.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

/* ================= LOGIN (FIXED) ================= */
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Access denied" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_EXPIRE }
    );

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: REFRESH_EXPIRE,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      role: user.role,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= REFRESH TOKEN ================= */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token)
      return res.status(401).json({ message: "Refresh token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, refreshToken: token });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_EXPIRE }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "If exists, email sent" });

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  console.log("RESET LINK:", `http://localhost:3000/reset/${token}`);
  res.json({ message: "Reset link sent" });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  res.json({ message: "Password updated" });
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
  res.json({ message: "Logged out" });
};
