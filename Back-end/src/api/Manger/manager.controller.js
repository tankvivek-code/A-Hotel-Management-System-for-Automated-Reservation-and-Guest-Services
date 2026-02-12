import User from "../User/user.model.js";
import Booking from "../User/booking.model.js";
import Room from "../User/room.model.js";
import bcrypt from "bcryptjs";

/* ================= DASHBOARD ================= */
const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getManagerDashboard = async (req, res) => {
  try {
    const { start, end } = getTodayRange();

    const [
      todayCheckIns,
      todayCheckOuts,
      totalRooms,
      availableRooms,
      bookedRooms,
      cleaningRooms,
      pendingCash,
    ] = await Promise.all([
      Booking.countDocuments({ checkIn: { $gte: start, $lte: end } }),
      Booking.countDocuments({ checkOut: { $gte: start, $lte: end } }),
      Room.countDocuments(),
      Room.countDocuments({ status: "Available" }),
      Room.countDocuments({ status: "Booked" }),
      Room.countDocuments({ status: "Cleaning" }),
      Booking.countDocuments({
        paymentMethod: "Cash",
        paymentStatus: "Pending",
      }),
    ]);

    res.status(200).json({
      todayCheckIns,
      todayCheckOuts,
      totalRooms,
      availableRooms,
      bookedRooms,
      cleaningRooms,
      pendingCash,
    });
  } catch (error) {
    console.error("MANAGER DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Manager dashboard error" });
  }
};

/* ================= ROOMS CRUD ================= */

// CREATE ROOM
export const createRoom = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { roomNumber, type, price, status } = req.body;

    const room = new Room({
      roomNumber,
      type,
      price: Number(price),
      status,
      image: req.file ? `/uploads/rooms/${req.file.filename}` : null,
    });

    await room.save();

    res.status(201).json(room);
  } catch (error) {
    console.error("CREATE ROOM ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ROOMS
export const getManagerRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

// UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, type, price, status } = req.body;

    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.status === "Booked") {
      return res.status(400).json({ message: "Booked room cannot be updated" });
    }

    room.roomNumber = roomNumber;
    room.type = type;
    room.price = Number(price);
    room.status = status;

    if (req.file) {
      room.image = `/uploads/rooms/${req.file.filename}`;
    }

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to update room" });
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.status === "Booked") {
      return res.status(400).json({ message: "Booked room cannot be deleted" });
    }

    await room.deleteOne();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room" });
  }
};

/* ================= USER MANAGEMENT ================= */

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

/* ================= GET USERS (MANAGER) ================= */
export const getUsers = async (req, res) => {
  try {
    // 🔥 Manager should see ONLY customers (real-world rule)
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ================= PAYMENTS ================= */
export const getPayments = async (req, res) => {
  try {
    const payments = await Booking.find({
      paymentMethod: "Cash",
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("GET PAYMENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "Paid";
    await booking.save();

    res.status(200).json({ message: "Payment verified" });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= BOOKINGS ================= */
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("roomId", "roomNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const checkoutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // prevent double checkout
    if (booking.status === "Checked-Out") {
      return res.status(400).json({ message: "Already checked out" });
    }

    // 1️⃣ update booking
    booking.status = "Checked-Out";
    await booking.save();

    // 2️⃣ make room AVAILABLE again ✅
    await Room.findByIdAndUpdate(booking.roomId, {
      status: "Available",
    });

    res.status(200).json({
      message: "Checkout successful, room is now available",
    });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
