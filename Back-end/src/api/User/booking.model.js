import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ================= PAYMENT ================= */
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "NetBanking", "Card", "Online"],
      default: "Online",
    },

    paymentDetails: {
      upiId: {
        type: String,
      },

      cardHolder: {
        type: String,
      },

      cardLast4: {
        type: String,
      },

      bankName: {
        type: String,
      },

      referenceNo: {
        type: String,
      },
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Paid",
    },

    /* ================= BOOKING INFO ================= */
    bookedBy: {
      type: String,
      enum: ["admin", "user", "manager"],
    },

    name: String,
    email: String,
    phone: String,

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Checked-In", "Checked-Out"],
      default: "Confirmed",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
