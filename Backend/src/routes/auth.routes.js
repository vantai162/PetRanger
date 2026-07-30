import {Router} from "express";
import {loginUser, registerUser, verifyEmail, resetPassword, verifyResetOTP, changePassword, refreshToken} from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/change-password", changePassword);
router.post("/refresh-token", refreshToken);


export default router;
