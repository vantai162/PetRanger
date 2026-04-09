import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailOTP = async (to, otp) => {
  await transporter.sendMail({
    from: `"PetRanger" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Mã xác thực email PetRanger",
    text: `Mã OTP của bạn là: ${otp}. Hết hạn sau 10 phút.`,
  });
};