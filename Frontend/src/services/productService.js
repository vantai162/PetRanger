const API_BASE_URL = "http://localhost:3000/api/products";

export async function getAllProducts() {
  const res = await fetch(`${API_BASE_URL}`);
  const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Lấy danh sách sản phẩm thất bại");
    }
    return data; // [{...}, {...}]
}


export async function getProductById(productId) {
  const res = await fetch(`${API_BASE_URL}/${productId}`);
  const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Lấy thông tin sản phẩm thất bại");
    }
    return data; // {...}
}

