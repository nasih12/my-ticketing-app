# 🎫 Okarin's Ticket Hub

Okarin's Ticket Hub adalah aplikasi manajemen tiket event berbasis web yang dibangun dengan React 18, Vite, React Router, dan Context API untuk state management. Backend menggunakan Node.js + Express + JWT Auth.

---

## 📦 Tech Stack

- ⚛️ React 18 (SPA)
- ⚡️ Vite
- 🧭 React Router DOM
- 🎯 Context API (Auth State)
- 🎨 CSS Custom (tanpa framework)
- 🔐 JWT Authentication
- 🌐 API via Express.js

---

## 🚀 Getting Started

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal.

### 1. Clone repository

```bash
git clone https://github.com/nasih12/my-ticketing-app.git
cd okarins-ticket-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env`

Di dalam folder root project, buat file `.env`:

```
VITE_API_BASE_URL=http://localhost:8082
```

> Ganti `localhost:8082` dengan base URL dari backend kamu.

---

## ▶️ Menjalankan project

```bash
npm run dev
```

Buka browser dan akses:

```
http://localhost:5173
```

---

## 🔐 Login Credential (Contoh)

Gunakan credential berikut untuk login (jika sudah register sebelumnya):

```json
{
  "username": "admin",
  "password": "123456"
}
```

> Token JWT akan disimpan di `localStorage` dan digunakan otomatis untuk header authorization.

---

## 🗂️ Fitur Utama

- ✅ Register & Login dengan validasi
- ✅ Menyimpan token JWT di localStorage
- ✅ Routing privat (PrivateRoute)
- ✅ Menampilkan daftar event dari API
- ✅ Styling modern dan responsif
- ✅ My Tickets (coming soon)

---

## 🛠️ Scripts

```bash
npm run dev       # Menjalankan dev server
npm run build     # Build untuk production
npm run preview   # Preview local production build
```

---

## 📁 Struktur Folder

```
src/
├── components/        # Navbar, PrivateRoute, dll
├── context/           # AuthContext.js
├── pages/             # Login.jsx, Register.jsx, Events.jsx, Home.jsx
├── App.jsx            # Routing utama
├── main.jsx           # Entry point React
└── main.css           # Styling global
```

---

## 🧪 Contoh Respons API `/api/events`

```json
{
  "data": [
    {
      "id": 1,
      "title": "React Summit 2025",
      "description": "Konferensi terbesar untuk React developer.",
      "location": "Jakarta Tech Center",
      "date": "2025-08-20T00:00:00.000Z",
      "stock": 96
    }
  ],
  "total": 4,
  "page": 1,
  "size": 10
}
```

---

## 🤝 Kontribusi

Pull Request dan feedback sangat diterima. Silakan fork project ini, buat branch baru, dan ajukan PR.

---

## 🪪 Lisensi

MIT License © 2025 — Okarin's Project