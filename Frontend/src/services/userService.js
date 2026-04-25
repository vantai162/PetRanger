import { apiFetch } from './apiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export async function getAllUsers() {

  const res = await apiFetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Lấy danh sách người dùng thất bại");
  }
  return res.json();
}
