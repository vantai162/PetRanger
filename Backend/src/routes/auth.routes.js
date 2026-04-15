import {Router} from "express";
import {loginUser, registerUser, verifyEmail, resetPassword, verifyResetOTP, changePassword} from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/change-password", changePassword);


export default router;