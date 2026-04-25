import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmailOTP } from "../config/email.js";

const registerUser = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({message: "Email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword
        });

        //tao customer
        await Customer.create({
            user_id: newUser._id
        });

        const otp = generateOTP();
        newUser.emailVerificationOtp = otp;
        newUser.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
        await newUser.save();

        // Gửi email
        await sendEmailOTP(email.toLowerCase(), otp);
        res.status(201).json({message: "User registered successfully ", userId: newUser._id});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({message: "Server error"});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body; 
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        // Tìm customer tương ứng với user để trả về customerId cho frontend
        const customer = await Customer.findOne({ user_id: user._id });
        const customerId = customer ? customer._id : null;

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            customerId,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "Server error"});
    }
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};



const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Thiếu email hoặc OTP" });
    }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User không tồn tại" });
        }

        if (!user.emailVerificationOtp || !user.emailVerificationExpires) {
            return res.status(400).json({ message: "OTP đã hết hạn hoặc không tồn tại" });
        }

        if (user.emailVerificationOtp !== otp) {
            return res.status(400).json({ message: "OTP không đúng" });
        }

        if (user.emailVerificationExpires < new Date()) {
            return res.status(400).json({ message: "OTP đã hết hạn" });
        }

        user.isVerified = true;
        user.emailVerificationOtp = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Xác thực email thành công" });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Reset password request for email:", email);

        if (!email) {
            return res.status(400).json({ message: "Thiếu email" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Có thể trả generic message để tránh lộ user
            return res.status(400).json({ message: "User không tồn tại" });
        }

        const otp = generateOTP();
        console.log("Generated OTP:", otp, "for email:", email.toLowerCase());

        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
        await user.save();

        // Gửi email OTP đặt lại mật khẩu
        await sendEmailOTP(email.toLowerCase(), otp);

        return res.status(200).json({ message: "Đã gửi mã OTP đặt lại mật khẩu" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Thiếu email hoặc OTP" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User không tồn tại" });
        }

        if (!user.resetPasswordOtp || !user.resetPasswordExpires) {
            return res.status(400).json({ message: "OTP đã hết hạn hoặc không tồn tại" });
        }

        if (user.resetPasswordOtp !== otp) {
            return res.status(400).json({ message: "OTP không đúng" });
        }

        if (user.resetPasswordExpires < new Date()) {
            return res.status(400).json({ message: "OTP đã hết hạn" });
        }

        // OTP hợp lệ, xoá OTP trong user và trả kết quả
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        const token = jwt.sign({ email: email.toLowerCase() }, process.env.JWT_SECRET, { expiresIn: "15m" });
        return res.status(200).json({ message: "OTP hợp lệ", token });
    } catch (error) {
        console.error("Verify reset OTP error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Thiếu email hoặc mật khẩu mới" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User không tồn tại" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {registerUser, loginUser, verifyEmail, resetPassword, verifyResetOTP, changePassword};

