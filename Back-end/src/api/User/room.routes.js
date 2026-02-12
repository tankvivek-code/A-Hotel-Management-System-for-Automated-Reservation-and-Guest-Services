import express from "express";
import Room from "./room.model.js";

const router = express.Router();

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({ status: "Available" });
    res.json(rooms);
  } catch {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

export default router;
