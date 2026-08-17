# 📚 Book Review

Aplikasi fullstack untuk mencatat, mengelola, dan mereview buku yang telah atau sedang Anda baca. Cari buku langsung dari Google Books API, atur status bacaan (ingin dibaca, sedang dibaca, selesai dibaca), tulis catatan pribadi, dan beri rating setelah selesai membaca.

Project ini dibangun sebagai portofolio pribadi untuk menunjukkan kemampuan pengembangan fullstack menggunakan Go (backend) dan Next.js (frontend).

---

## ✨ Fitur

- **Autentikasi** — Register & login dengan JWT (token berlaku 7 hari)  
- **Pencarian buku otomatis** — Cari judul buku, hasil dari Google Books API muncul sebagai dropdown, klik untuk auto-fill judul/penulis/sampul  
- **Manajemen rak buku** — Tambah, lihat detail, edit catatan & status, hapus buku dari rak  
- **Filter & pencarian** — Filter berdasarkan status baca (Ingin Dibaca / Sedang Dibaca / Selesai Dibaca), cari berdasarkan judul/penulis, urutkan (terbaru/terlama/A-Z)  
- **Rating & review** — Beri rating 1–5 bintang dan tulis ulasan untuk buku yang telah selesai dibaca  
- **Dashboard** — Ringkasan statistik jumlah buku per status, daftar buku terbaru  
- **Responsive UI** — Tampilan grid/list, sidebar dengan mode expand/collapse

---

## 🛠️ Tech Stack

### Backend

| Teknologi | Keterangan |
| :---- | :---- |
| **Go** | Bahasa pemrograman utama |
| **Gin** | Web framework (routing, middleware, JSON binding) |
| **pgx/v5 \+ pgxpool** | PostgreSQL driver & connection pool |
| **PostgreSQL** | Database relasional |
| **JWT (golang-jwt/jwt/v5)** | Autentikasi berbasis token |
| **bcrypt** | Hashing password |
| **gin-contrib/cors** | Konfigurasi CORS |
| **godotenv** | Memuat environment variable dari file `.env` |
| **Google Books API** | Sumber data pencarian buku |

Arsitektur backend menggunakan pola **layered architecture**:

model → repository → service → handler → router

### Frontend

| Teknologi | Keterangan |
| :---- | :---- |
| **Next.js** (App Router) | Framework React, dijalankan dengan Turbopack |
| **TypeScript** | Bahasa pemrograman |
| **Tailwind CSS v4** | Styling utility-first |
| **Axios** | HTTP client, dengan interceptor auth otomatis |
| **@iconify/react** | Library ikon |

Struktur komponen frontend mengikuti pola **feature-based \+ shared components**:

components/

├── contexts/      → React Context (state global, misal SidebarContext)

├── features/       → Komponen spesifik per fitur (mis. features/auth)

├── shared/          → Komponen lintas fitur (BookCard, modal, dsb)

└── ui/              → Komponen dasar generic (Button, Input, Label)

---

## 🗄️ Skema Database

Terdapat 4 tabel utama:

| Tabel | Fungsi |
| :---- | :---- |
| `users` | Data akun pengguna |
| `books` | Katalog buku (dari Google Books API atau input manual) |
| `user_books` | Relasi rak buku per user — status baca, catatan, tanggal mulai/selesai |
| `reviews` | Rating & ulasan yang ditulis user untuk suatu buku |

Setiap user hanya bisa memiliki satu entri rak (`user_books`) dan satu review (`reviews`) per buku, dijamin lewat `UNIQUE(user_id, book_id)` di level database. Rating divalidasi harus 1–5 lewat `CHECK` constraint.

---

## 📡 API Endpoints

Base URL: `http://localhost:8080/api`

### Autentikasi (publik)

| Method | Endpoint | Deskripsi |
| :---- | :---- | :---- |
| `POST` | `/register` | Daftar akun baru |
| `POST` | `/login` | Login, mengembalikan JWT token |

### Buku (butuh autentikasi)

| Method | Endpoint | Deskripsi |
| :---- | :---- | :---- |
| `GET` | `/books/search?q=` | Cari buku dari Google Books API |
| `POST` | `/books` | Tambah buku ke rak |
| `GET` | `/books/shelf` | Ambil semua buku di rak user |
| `PUT` | `/books/shelf/:id` | Edit catatan & status baca |
| `DELETE` | `/books/shelf/:id` | Hapus buku dari rak |

### Review (butuh autentikasi)

| Method | Endpoint | Deskripsi |
| :---- | :---- | :---- |
| `POST` | `/books/:id/reviews` | Tambah rating & ulasan |
| `PUT` | `/books/:id/reviews` | Update rating & ulasan |
| `GET` | `/books/:id/reviews` | Ambil semua ulasan \+ rata-rata rating suatu buku |

### Lainnya

| Method | Endpoint | Deskripsi |
| :---- | :---- | :---- |
| `GET` | `/health` | Health check server (di luar prefix `/api`) |

Semua endpoint yang butuh autentikasi memerlukan header:

Authorization: Bearer \<token\>

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat

Pastikan sudah terinstall:

- [Go](https://go.dev/dl/) (versi 1.21 atau lebih baru disarankan)  
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru disarankan) & npm  
- [PostgreSQL](https://www.postgresql.org/download/) (lokal, atau gunakan layanan seperti Neon/Supabase)  
- API Key [Google Books API](https://console.cloud.google.com/apis/library/books.googleapis.com) (opsional, tapi disarankan agar tidak kena rate limit)

### 1\. Clone repository

git clone https://github.com/username-anda/book-review.git

cd book-review

### 2\. Setup Backend

cd backend

go mod tidy

Buat file `.env` di dalam folder `backend/` dengan isi:

DATABASE\_URL=postgres://user:password@localhost:5432/bookreview?sslmode=disable

JWT\_SECRET=ganti\_dengan\_secret\_key\_acak\_yang\_panjang

PORT=8080

GOOGLE\_BOOKS\_API\_KEY=api\_key\_google\_books\_anda

Buat database PostgreSQL, lalu jalankan migration (sesuaikan dengan tool migration yang digunakan, mis. `golang-migrate`):

\# contoh jika menggunakan golang-migrate

migrate \-path ./migrations \-database "$DATABASE\_URL" up

Jalankan server backend:

go run ./cmd/api

Server berjalan di `http://localhost:8080`. Pastikan muncul log `server jalan di port 8080` tanpa error.

### 3\. Setup Frontend

Buka terminal baru:

cd frontend

npm install

Buat file `.env.local` di dalam folder `frontend/` (jika API base URL dikonfigurasi lewat environment variable):

NEXT\_PUBLIC\_API\_URL=http://localhost:8080/api

Jalankan development server:

npm run dev

Frontend berjalan di `http://localhost:3000`.

### 4\. Mulai gunakan

1. Buka `http://localhost:3000/signup`, buat akun baru  
2. Login di `http://localhost:3000/signin`  
3. Mulai tambah buku lewat tombol **Tambah Buku** di halaman Daftar Buku

---

## 📁 Struktur Folder

book-review/

├── backend/

│   ├── api/              →  → Entry point backend untuk deployment di Vercel (index.go)

│   ├── cmd/api/              → Entry point aplikasi untuk di lokal (main.go)

│   ├── pkg/

│   │   ├── config/            → Konfigurasi & environment variable

│   │   ├── database/         → Koneksi database

│   │   ├── model/              → Struct data (User, Book, UserBook, Review)

│   │   ├── repository/       → Query database (layer akses data)

│   │   ├── service/            → Logika bisnis

│   │   ├── handler/           → HTTP handler (controller)

│   │   └── middleware/       → Middleware (autentikasi JWT)

│   └── go.mod

│

└── frontend/

    ├── app/                      → Routing Next.js App Router

    ├── components/

    │   ├── contexts/            → React Context

    │   ├── features/            → Komponen per fitur (auth, dsb)

    │   ├── shared/               → Komponen lintas fitur

    │   └── ui/                    → Komponen dasar (Button, Input, dsb)

    ├── lib/                        → Konfigurasi axios, helper auth

    ├── types/                    → Definisi TypeScript

    └── package.json

---

## 🔒 Keamanan

- Password di-hash menggunakan **bcrypt** sebelum disimpan  
- Autentikasi menggunakan **JWT** dengan masa berlaku 7 hari  
- Semua query database menggunakan **parameterized query** (aman dari SQL Injection)  
- **CORS** dibatasi hanya untuk origin frontend yang diizinkan  
- Password hash **tidak pernah** dikirim dalam response API (`json:"-"`)

>   
> Catatan: project ini dibangun untuk keperluan portofolio/pembelajaran. Untuk penggunaan production dengan data pengguna asli, disarankan menambahkan rate limiting pada endpoint login/register serta memastikan HTTPS aktif saat deploy.

---

## 🌐 Deployment

| Layer | Platform |
| :---- | :---- |
| Frontend | Vercel |
| Backend | Render |
| Database | Neon / Supabase |

Saat deploy, pastikan untuk:

- Mengganti `AllowOrigins` pada konfigurasi CORS di `main.go` sesuai domain frontend production  
- Mengatur environment variable (`DATABASE_URL`, `JWT_SECRET`, `GOOGLE_BOOKS_API_KEY`, `NEXT_PUBLIC_API_URL`) sesuai environment masing-masing platform

---

## 👤 Kontributor

Dibuat oleh **\[Nama Anda\]** sebagai bagian dari portofolio pribadi.

- LinkedIn: \[tautan profil Anda\]  
- GitHub: \[tautan profil Anda\]

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran dan portofolio pribadi.  
