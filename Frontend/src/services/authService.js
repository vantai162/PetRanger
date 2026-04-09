// Frontend/src/services/authService.js

const API_BASE_URL = "http://localhost:3000/api/auth";

export async function registerUser({ fullName, email, phone, password }) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: fullName,
      email,
      phone,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Đăng ký thất bại");
  }

  return data; // { message, userId, token? }
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }

  return data; // { message, token, userId }
}

export async function verifyEmailOTP({ email, otp }) {
  const res = await fetch(`${API_BASE_URL}/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Xác thực email thất bại");
  }
  return data;
}

export async function verifyResetOTP({ email, otp }) {
  const res = await fetch(`${API_BASE_URL}/verify-reset-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Xác thực OTP thất bại");
  }
  return data;
}

export async function resetPassword({ email }) {
  const res = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Gửi yêu cầu đặt lại mật khẩu thất bại");
  }
  return data;
}

export async function changePassword({ email, newPassword }) {
  const res = await fetch(`${API_BASE_URL}/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Đổi mật khẩu thất bại");
  }
  return data;
}