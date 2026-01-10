import express from "express"; // ✅ ADD THIS
import path from "path";

import userRoutes from "../User/user.routes.js";
import adminRoutes from "../Admin/admin.routes.js";
import roomRoutes from "../User/room.routes.js";
import bookingRoutes from "../User/booking.routes.js";
import { autoCheckout } from "../jobs/autoCheckout.js";
import nodeCron from "node-cron";
import userInvoiceRoutes from "../User/invoice.route.js";
import invoiceRoutes from "../User/invoice.route.js";

const Routes = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api", bookingRoutes);
  app.use("/public", roomRoutes);
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  nodeCron.schedule("0 * * * *", autoCheckout);
  app.use("/api/user", userInvoiceRoutes);
  app.use("/api", invoiceRoutes);
};

export default Routes;
