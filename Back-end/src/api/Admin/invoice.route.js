import express from "express";
import PDFDocument from "pdfkit";
import Booking from "../User/booking.model.js";

const router = express.Router();

/* =====================================================
   🧾 ADMIN INVOICE (PROFESSIONAL HOTEL BILL)
===================================================== */
router.get("/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("roomId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=invoice-${booking._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("GRAND PALACE HOTEL", { align: "center" });
    doc.fontSize(10).text("ADMIN COPY", { align: "right" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Invoice No: INV-${booking._id}`);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Booked By: ${booking.bookedBy}`);
    doc.moveDown();

    doc.fontSize(14).text("Customer Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Name: ${booking.userId?.name || booking.name}`);
    doc.text(`Email: ${booking.userId?.email || booking.email}`);
    doc.text(`Phone: ${booking.phone || "-"}`);
    doc.moveDown();

    doc.fontSize(14).text("Stay Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Room Type: ${booking.roomId?.type}`);
    doc.text(`Check-In: ${new Date(booking.checkIn).toLocaleString()}`);
    doc.text(`Check-Out: ${new Date(booking.checkOut).toLocaleString()}`);
    doc.text(`Status: ${booking.status}`);
    doc.moveDown();

    doc.fontSize(14).text("Payment Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Payment Method: ${booking.paymentMethod}`);
    doc.text(`Payment Status: ${booking.paymentStatus}`);
    doc.moveDown();

    doc.fontSize(14).text(`Total Amount Paid: ₹${booking.amount}`, {
      underline: true,
    });

    doc.moveDown(3);
    doc
      .fontSize(10)
      .text("This is a system generated invoice. No signature required.", {
        align: "center",
      });

    doc.end();
  } catch (err) {
    console.error("ADMIN INVOICE ERROR:", err);
    res.status(500).json({ message: "Invoice generation failed" });
  }
});

export default router;
