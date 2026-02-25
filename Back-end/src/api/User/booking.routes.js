import express from "express";
import auth from "../middlewares/auth.middleware.js";
import Room from "../User/room.model.js";
import Booking from "./booking.model.js";
import User from "../User/user.model.js";

const router = express.Router();

/* =========================================================
   🏨 BOOK ROOM (USER + MANAGER)
========================================================= */
router.post("/book-room", auth, async (req, res) => {
  try {
    // ❌ ADMIN CANNOT BOOK
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin is not allowed to book rooms" });
    }

    const {
      roomId,
      userId, // only manager sends this
      name,
      email,
      phone,
      checkIn,
      checkOut,
      amount,
      paymentMethod,
      paymentDetails,
    } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.status === "Booked") {
      return res.status(400).json({ message: "Room already booked" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in" });
    }

    // ✅ FINAL USER ID LOGIC
    let finalUserId;

    if (req.user.role === "user") {
      finalUserId = req.user.id;
    } else if (req.user.role === "manager") {
      if (!userId) {
        return res
          .status(400)
          .json({ message: "User is required for manager booking" });
      }

      const user = await User.findById(userId);
      if (!user || user.role !== "user") {
        return res.status(404).json({ message: "User not found" });
      }

      finalUserId = userId;
    }

    const booking = await Booking.create({
      roomId,
      userId: finalUserId,
      name,
      email,
      phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amount,
      paymentMethod: paymentMethod || "Cash",
      paymentDetails: paymentDetails || {},
      paymentStatus: req.body.paymentStatus || "Paid",
      status: "Confirmed",
      bookedBy: req.user.role,
    });

    room.status = "Booked";
    await room.save();

    res.json({
      message: "Booking confirmed",
      booking,
    });
  } catch (err) {
    console.error("BOOK ROOM ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

/* =========================================================
   📘 MY BOOKINGS (USER)
========================================================= */
router.get("/my-bookings", auth, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find({ userId: req.user.id })
      .populate("roomId", "type price image")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/* =========================================================
   📘 ALL BOOKINGS (ADMIN + MANAGER)
========================================================= */
router.get("/bookings", auth, async (req, res) => {
  try {
    if (!["admin", "manager"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find()
      .populate("roomId", "type price")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/* =========================================================
   🚪 CHECKOUT ROOM (ADMIN + MANAGER)
========================================================= */
router.put("/checkout/:bookingId", auth, async (req, res) => {
  try {
    if (!["admin", "manager"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Checked-Out";
    await booking.save();

    await Room.findByIdAndUpdate(booking.roomId, {
      status: "Available",
    });

    res.json({
      message: "Checkout successful. Room is now available.",
    });
  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
});

export default router;
