import express from "express";
import auth from "../middlewares/auth.middleware.js";
import Room from "../User/room.model.js";
import Booking from "./booking.model.js";

const router = express.Router();

/* =========================================================
   🏨 BOOK ROOM (USER + ADMIN)
========================================================= */
router.post("/book-room", auth, async (req, res) => {
  try {
    const {
      roomId,
      userId,
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

    const finalUserId =
      req.user.role === "admin" && userId ? userId : req.user.id;

    const booking = await Booking.create({
      roomId,
      userId: finalUserId,
      name,
      email,
      phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amount,
      paymentMethod,
      paymentDetails: paymentDetails || {}, // ✅ FIX
      paymentStatus: "Paid",
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
    const userId = req.user.id || req.user._id;

    const bookings = await Booking.find({ userId })
      .populate("roomId", "type price image")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/* =========================================================
   📘 ALL BOOKINGS (ADMIN)
========================================================= */
router.get("/bookings", auth, async (req, res) => {
  try {
    let filter = {};

    // users can only see their bookings
    if (req.user.role === "user") {
      filter = { userId: req.user.id };
    }

    const bookings = await Booking.find(filter)
      .populate("roomId", "type price")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/* =========================================================
   🚪 CHECKOUT ROOM (ADMIN)
========================================================= */
router.put("/checkout/:bookingId", auth, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
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
