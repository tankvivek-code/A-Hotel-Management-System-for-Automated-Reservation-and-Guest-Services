import express from "express";
import path from "path";
import "../jobs/autoCheckout.js";

import userRoutes from "../User/user.routes.js";
import adminRoutes from "../Admin/admin.routes.js";
import roomRoutes from "../User/room.routes.js";
import bookingRoutes from "../User/booking.routes.js";
import userInvoiceRoutes from "../User/invoice.route.js";
import invoiceRoutes from "../User/invoice.route.js";
import managerRoutes from "../Manger/manager.routes.js";

const Routes = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/manager", managerRoutes);
  app.use("/api", bookingRoutes);
  app.use("/public", roomRoutes);
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  app.use("/api/user", userInvoiceRoutes);
  app.use("/api", invoiceRoutes);
};

export default Routes;
