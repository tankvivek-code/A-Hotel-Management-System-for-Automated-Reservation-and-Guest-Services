import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js"; // ✅ ADD THIS

import {
  /* 📊 Dashboard */
  dashboardStats,

  /* 👥 User Management */
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,

  /* 🏨 Room Management */
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "./admin.controller.js";

import Room from "../User/room.model.js"; // 🔥 needed for public rooms
import User from "../User/user.model.js";
import invoiceRoutes from "./invoice.route.js";

const router = express.Router();

// ================= GET SINGLE USER (ADMIN) =================
router.get("/users/:id", auth, role("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   📊 ADMIN DASHBOARD (ADMIN ONLY)
========================================================= */
router.get("/dashboard", auth, role("admin"), dashboardStats);
router.use("/invoice", auth, role("admin"), invoiceRoutes);

/* =========================================================
   👥 USER MANAGEMENT (ADMIN ONLY)
========================================================= */
router.get("/users", auth, role("admin"), getAllUsers);
router.post("/users", auth, role("admin"), createUser);
router.put("/users/:id", auth, role("admin"), updateUser);
router.delete("/users/:id", auth, role("admin"), deleteUser);

/* =========================================================
   🏨 ROOM MANAGEMENT (ADMIN ONLY)
========================================================= */

/* 🔹 CREATE ROOM (WITH IMAGE UPLOAD) */
router.post(
  "/rooms",
  auth,
  role("admin"),
  upload.single("image"), // ✅ REQUIRED
  createRoom,
);

/* 🔹 GET ROOMS */
router.get("/rooms", auth, role("admin"), getRooms);

/* 🔹 UPDATE ROOM (WITH IMAGE UPLOAD) */
router.put(
  "/rooms/:id",
  auth,
  role("admin"),
  upload.single("image"), // ✅ REQUIRED
  updateRoom,
);

/* 🔹 DELETE ROOM */
router.delete("/rooms/:id", auth, role("admin"), deleteRoom);

/* =========================================================
   🌐 PUBLIC ROOMS (CUSTOMER PAGE)
   → NO auth, NO role
========================================================= */
router.get("/public/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({ status: "Available" });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

export default router;
