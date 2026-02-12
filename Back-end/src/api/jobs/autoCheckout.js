import cron from "node-cron";
import Booking from "../User/booking.model.js";
import Room from "../User/room.model.js";

export const autoCheckout = async () => {
  try {
    const now = new Date();

    const expiredBookings = await Booking.find({
      checkOut: { $lt: now },
      status: { $ne: "Checked-Out" },
    });

    for (const booking of expiredBookings) {
      booking.status = "Checked-Out";
      await booking.save();

      await Room.findByIdAndUpdate(booking.roomId, {
        status: "Available",
      });
    }

    if (expiredBookings.length > 0) {
      console.log("✅ Auto checkout done:", expiredBookings.length);
    }
  } catch (err) {
    console.error("❌ Auto checkout failed:", err.message);
  }
};

// 🔥 RUN EVERY 1 MINUTE
cron.schedule("* * * * *", () => {
  console.log("⏰ Auto checkout cron running...");
  autoCheckout();
});
