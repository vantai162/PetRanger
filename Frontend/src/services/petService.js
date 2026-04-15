const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/pets`;

export async function createPet(petData, token) {
    const body = {
    ...petData,
    imageUrl: petData.image, // map sang field backend dùng
  };
  delete body.image; // xóa field cũ để tránh conflict
  const res = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Thêm thú cưng thất bại");
    }
    return data; // { message, pet }
}

export async function getPets(filters) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE_URL}?${query}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Lấy danh sách thú cưng thất bại");
  }
  return data.pets; // [{...}, {...}]
}

export async function getPetById(petId) {
  const res = await fetch(`${API_BASE_URL}/${petId}`);
  const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Lấy thông tin thú cưng thất bại");
    }
    return data.pet; // {...}
}