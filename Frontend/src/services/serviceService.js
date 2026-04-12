const API_BASE_URL = "http://localhost:3000/api/services";

export async function getAllServices() {
    const res = await fetch(`${API_BASE_URL}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Lấy danh sách dịch vụ thất bại");
    }
    return data; // [{...}, {...}]
}

export async function getServiceById(serviceId) {
    const res = await fetch(`${API_BASE_URL}/${serviceId}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Lấy thông tin dịch vụ thất bại");
    }
    return data; // {...}
}