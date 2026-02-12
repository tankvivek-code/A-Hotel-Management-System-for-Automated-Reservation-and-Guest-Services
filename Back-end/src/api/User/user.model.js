import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔥 ROLE SYSTEM (REAL WORLD)
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },

    // 🔹 Manager specific (optional but real-world)
    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: String,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
