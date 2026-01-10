import Booking from "../User/booking.model.js";
import Room from "../User/booking.model.js";

export const autoCheckout = async () => {
  const now = new Date();

  const expiredBookings = await Booking.find({
    checkOut: { $lt: now },
    status: { $ne: "Checked-Out" },
  });

  for (let booking of expiredBookings) {
    booking.status = "Checked-Out";
    await booking.save();

    await Room.findByIdAndUpdate(booking.roomId, {
      status: "Available",
    });
  }

  console.log("Auto checkout completed");
};
