# 🐾 PetRanger - Pet Care & Service Platform

PetRanger là một nền tảng web toàn diện dành cho thú cưng, cho phép người dùng mua sắm sản phẩm, nhận nuôi thú cưng, quản lý thú cưng cá nhân và đặt các dịch vụ chăm sóc thú cưng một cách dễ dàng.

---

## 🚀 Features

### 🛒 Pet Shop

* Mua sắm các sản phẩm dành cho thú cưng:

  * Thức ăn
  * Dây dắt (leash)
  * Phụ kiện
* Tìm kiếm, lọc theo danh mục
* Đánh giá & review sản phẩm

### 🐶 Pet Adoption

* Xem danh sách thú cưng cần nhận nuôi
* Đăng ký nhận nuôi
* Quản lý thông tin thú cưng

### 🐾 Pet Management

* Thêm thú cưng cá nhân
* Theo dõi thông tin:

  * Tên, tuổi, giống
  * Lịch sử chăm sóc

### 🏥 Pet Services Booking

* Đặt lịch các dịch vụ:

  * Grooming (chăm sóc)
  * Veterinary (thú y)
  * Boarding / Daycare
  * Spa
* Quản lý lịch hẹn
* Theo dõi trạng thái dịch vụ

---

## 🛠️ Tech Stack

### Frontend

* ReactJS
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### DevOps & Infrastructure

* Docker
* Redis (Caching, Session, Queue)

---

## 📦 Project Structure

```
PetRanger/
│── client/        # React frontend
│── server/        # Express backend
│── docker/        # Docker configs
│── docs/          # Documentation
│── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone project

```bash
git clone https://github.com/your-username/PetRanger.git
cd PetRanger
```

### 2. Setup bằng Docker (khuyến nghị)

```bash
docker-compose up --build
```

### 3. Hoặc chạy manual

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm start
```

---

## 🔥 Environment Variables

Tạo file `.env` trong thư mục `server`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/petranger
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key
```

---

## 📡 API Overview

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products`

### Services

* `GET /api/services`
* `POST /api/bookings`

### Pets

* `GET /api/pets`
* `POST /api/pets`

### Adoption

* `GET /api/adoptions`
* `POST /api/adoptions`

---

## 🧠 Future Improvements

* Thanh toán online (Stripe / VNPay)
* Recommendation system (AI)
* Mobile App (React Native)

---

## 👨‍💻 Author

* Tèo Hoàng

---

## 📄 License

This project is licensed under the MIT License.
