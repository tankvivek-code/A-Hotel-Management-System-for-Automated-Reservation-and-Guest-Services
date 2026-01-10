import express from "express";
import Room from "./room.model.js";

const router = express.Router();

/* ✅ SHOW ALL ROOMS (Available + Booked) */
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find(); // 🔥 NO FILTER
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
