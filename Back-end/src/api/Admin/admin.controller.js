import User from "../User/user.model.js";
import Room from "../User/room.model.js";
import Booking from "../User/booking.model.js";
import bcrypt from "bcryptjs";

/* =========================================================
   📊 DASHBOARD STATISTICS
========================================================= */
export const dashboardStats = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: "Available" });
    const bookedRooms = await Room.countDocuments({ status: "Booked" });

    const totalUsers = await User.countDocuments({ role: "user" });

    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({
      status: { $in: ["Confirmed", "Checked-In"] },
    });

    const revenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const now = new Date();
    const startOfDay = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    const todayCheckIns = await Booking.countDocuments({
      checkIn: { $gte: startOfDay, $lte: endOfDay },
    });

    const todayCheckOuts = await Booking.countDocuments({
      checkOut: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      totalRooms,
      availableRooms,
      bookedRooms,
      totalUsers,
      totalBookings,
      activeBookings,
      totalRevenue,
      todayCheckIns,
      todayCheckOuts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   👥 USER MANAGEMENT (ADMIN)
========================================================= */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
    }).select("-password");

    res.json(users);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "You cannot update your own account from admin panel",
      });
    }

    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================================================
   🏨 ROOM MANAGEMENT (WITH IMAGE UPLOAD)
========================================================= */

/* 🔹 CREATE ROOM */
export const createRoom = async (req, res) => {
  try {
    const roomData = {
      ...req.body,
      price: Number(req.body.price),
    };

    if (req.file) {
      roomData.image = `/uploads/rooms/${req.file.filename}`;
    }

    const room = await Room.create(roomData);
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 🔹 GET ROOMS */
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔹 UPDATE ROOM */
export const updateRoom = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      price: Number(req.body.price),
    };

    if (req.file) {
      updateData.image = `/uploads/rooms/${req.file.filename}`;
    }

    const room = await Room.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 🔹 DELETE ROOM */
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
