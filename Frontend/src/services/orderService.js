const API_BASE_URL = "http://localhost:3000/api/orders";

export async function getOrdersByCustomer(customerId, token) {
  const res = await fetch(`${API_BASE_URL}/customer/${customerId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lấy danh sách đơn hàng thất bại");
  }

  return data.orders || [];
}

export async function getOrderById(orderId, token) {
  const res = await fetch(`${API_BASE_URL}/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lấy chi tiết đơn hàng thất bại");
  }

  return data.order;
}
