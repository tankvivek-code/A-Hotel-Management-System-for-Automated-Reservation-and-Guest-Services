import express from "express";
import PDFDocument from "pdfkit";
import auth from "../middlewares/auth.middleware.js";
import Booking from "../User/booking.model.js";

const router = express.Router();

/* =====================================================
   🧾 USER INVOICE (PROFESSIONAL HOTEL BILL)
===================================================== */
router.get("/invoice/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("roomId")
      .populate("userId");

    if (!booking) {
      return res.status(404).send("Invoice not found");
    }

    /* 🔐 ENSURE USER CAN ONLY SEE OWN INVOICE */
    if (
      req.user.role === "user" &&
      booking.userId._id.toString() !== req.user.id
    ) {
      return res.status(403).send("Access denied");
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=invoice-${booking._id}.pdf`
    );

    doc.pipe(res);

    /* ================= HEADER ================= */
    doc
      .fontSize(22)
      .text("GRAND PALACE HOTEL", { align: "center" })
      .fontSize(10)
      .text("Luxury Stay & Comfort", { align: "center" })
      .text("Mumbai, India | Phone: +91 98765 43210", { align: "center" })
      .moveDown(2);

    /* ================= INVOICE META ================= */
    doc.fontSize(12);
    doc.text(`Invoice No: INV-${booking._id}`);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    /* ================= CUSTOMER DETAILS ================= */
    doc.fontSize(14).text("Customer Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Name: ${booking.userId?.name || booking.name}`);
    doc.text(`Email: ${booking.userId?.email || booking.email}`);
    doc.text(`Phone: ${booking.phone || "-"}`);
    doc.moveDown();

    /* ================= STAY DETAILS ================= */
    doc.fontSize(14).text("Stay Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Room Type: ${booking.roomId?.type}`);
    doc.text(`Check-In: ${new Date(booking.checkIn).toLocaleString()}`);
    doc.text(`Check-Out: ${new Date(booking.checkOut).toLocaleString()}`);
    doc.text(`Booking Status: ${booking.status}`);
    doc.moveDown();

    /* ================= PAYMENT DETAILS ================= */
    doc.fontSize(14).text("Payment Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Payment Method: ${booking.paymentMethod}`);
    doc.text(`Payment Status: ${booking.paymentStatus}`);

    if (booking.paymentDetails) {
      if (booking.paymentMethod === "UPI") {
        doc.text(`UPI ID: ${booking.paymentDetails.upiId || "-"}`);
      }

      if (booking.paymentMethod === "Card") {
        doc.text(`Card Holder: ${booking.paymentDetails.cardHolder || "-"}`);
        doc.text(
          `Card Last 4 Digits: **** ${
            booking.paymentDetails.cardLast4 || "XXXX"
          }`
        );
      }

      if (booking.paymentMethod === "NetBanking") {
        doc.text(`Bank Name: ${booking.paymentDetails.bankName || "-"}`);
      }
    }

    doc.moveDown();

    /* ================= BILL SUMMARY ================= */
    doc.fontSize(14).text("Billing Summary", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text(`Room Charges: ₹${booking.amount}`);
    doc.text("Taxes & Fees: ₹0");
    doc.moveDown(0.5);

    doc.fontSize(13).text(`Total Amount Paid: ₹${booking.amount}`, {
      underline: true,
    });

    doc.moveDown(3);

    /* ================= FOOTER ================= */
    doc
      .fontSize(10)
      .text("This is a system generated invoice. No signature required.", {
        align: "center",
      })
      .moveDown(0.5)
      .text(
        "Thank you for choosing Grand Palace Hotel. We look forward to serving you again!",
        { align: "center" }
      );

    doc.end();
  } catch (err) {
    console.error("USER INVOICE ERROR:", err);
    res.status(500).send("Invoice generation failed");
  }
});

export default router;
