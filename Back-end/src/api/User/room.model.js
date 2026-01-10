import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  type: String,
  price: Number,
  status: {
    type: String,
    enum: ["Available", "Booked"],
    default: "Available",
  },
  image: {
    type: String, // 🔥 Image URL
    required: true,
  },
});

export default mongoose.model("Room", roomSchema);
