import { apiFetch } from './apiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`;


export async function getAllProducts() {
  const res = await apiFetch(`${API_BASE_URL}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Lấy danh sách sản phẩm thất bại");
  }
  return data; // [{...}, {...}]
}


export async function getProductById(productId) {
  const res = await apiFetch(`${API_BASE_URL}/${productId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Lấy thông tin sản phẩm thất bại");
  }
  return data; // {...}
}

export async function reviewProduct(productId, rating, token) {
  const res = await apiFetch(`${API_BASE_URL}/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ rating }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Đánh giá sản phẩm thất bại");
  }
  return data.product; // product đã được cập nhật rating/reviews
}

