import express from "express";
import * as ctrl from "./user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/refresh-token", ctrl.refreshToken);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/reset-password/:token", ctrl.resetPassword);
router.post("/logout", auth, ctrl.logout);

export default router;
