import express from "express";
import protect from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  getManagerDashboard,
  createRoom,
  getManagerRooms,
  updateRoom,
  deleteRoom,
  createUser,
  deleteUser,
  getUsers,
  getPayments,
  verifyPayment,
  getBookings,
  checkoutBooking,
} from "./manager.controller.js";

const router = express.Router();

/* ================= DASHBOARD ================= */
router.get(
  "/dashboard",
  protect,
  roleMiddleware("manager", "admin"),
  getManagerDashboard,
);

/* ================= ROOMS ================= */
router.get(
  "/rooms",
  protect,
  roleMiddleware("manager", "admin"),
  getManagerRooms,
);

router.post(
  "/rooms",
  protect,
  roleMiddleware("manager"),
  upload.single("image"),
  createRoom,
);

router.put(
  "/rooms/:id",
  protect,
  roleMiddleware("manager"),
  upload.single("image"),
  updateRoom,
);

router.delete("/rooms/:id", protect, roleMiddleware("manager"), deleteRoom);

router.get("/payment", getPayments);
router.put("/payment/:id/verify", verifyPayment);

router.get("/booking", getBookings);

/* ================= USERS ================= */
router.get("/users", protect, roleMiddleware("manager", "admin"), getUsers);

router.post("/users", protect, roleMiddleware("manager", "admin"), createUser);

router.delete(
  "/users/:id",
  protect,
  roleMiddleware("manager", "admin"),
  deleteUser,
);
router.put(
  "/booking/:id/checkout",
  protect,
  roleMiddleware("manager", "admin"),
  checkoutBooking,
);

export default router;
