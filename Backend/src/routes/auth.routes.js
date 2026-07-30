import {Router} from "express";
import {loginUser, registerUser, verifyEmail, resetPassword, verifyResetOTP, changePassword, deleteUser} from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/change-password", changePassword);
router.delete("/delete-user/:userId", deleteUser);


export default router;