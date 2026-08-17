# 💰 Expense Tracker App

Aplikasi pencatatan keuangan sederhana berbasis **JavaScript** yang
digunakan untuk mencatat pemasukan dan pengeluaran secara mudah.

Project ini dibuat sebagai **Proyek Akhir** pada pembelajaran
**Front-End Web Pemula** di Dicoding.

## 🚀 Demo

🔗 **Live Demo:** Tambahkan URL Vercel kamu di sini.

## ✨ Fitur

-   ➕ Menambahkan transaksi pemasukan dan pengeluaran
-   💰 Menampilkan total saldo
-   📈 Menampilkan total pemasukan
-   📉 Menampilkan total pengeluaran
-   ✏️ Mengedit transaksi
-   🗑️ Menghapus transaksi
-   🔄 Mengubah tipe transaksi dari pemasukan menjadi pengeluaran dan
    sebaliknya
-   🔍 Mencari transaksi berdasarkan judul
-   💾 Menyimpan data transaksi menggunakan Local Storage
-   🔄 Memuat kembali data transaksi setelah halaman di-refresh
-   ⚠️ Validasi judul transaksi
-   ⚠️ Validasi nominal transaksi
-   📊 Dashboard diperbarui secara otomatis ketika data transaksi
    berubah

## 🛠️ Teknologi

-   **HTML5**
-   **CSS3**
-   **JavaScript**
-   **DOM Manipulation**
-   **Web Storage API (Local Storage)**
-   **Custom Event**

## ▶️ Cara Menjalankan

### 1. Clone Repository

``` bash
git clone https://github.com/NurhalizaSulthan/expense-tracker-app.git
```

### 2. Masuk ke Folder Project

``` bash
cd expense-tracker-app
```

### 3. Jalankan Aplikasi

Project ini menggunakan HTML, CSS, dan JavaScript murni sehingga tidak
membutuhkan proses instalasi dependencies.

Aplikasi dapat dijalankan menggunakan **Live Server** pada Visual Studio
Code.

Buka file:

``` text
index.html
```

Kemudian pilih:

``` text
Open with Live Server
```

Aplikasi akan terbuka pada browser.

## 💾 Penyimpanan Data

Data transaksi disimpan menggunakan **Local Storage** pada browser.

Dengan demikian, data transaksi tetap tersedia meskipun halaman aplikasi
di-refresh.

Setiap transaksi memiliki informasi:

-   ID
-   Judul transaksi
-   Nominal
-   Tanggal
-   Tipe transaksi

Tipe transaksi terdiri dari:

-   `income` --- Pemasukan
-   `expense` --- Pengeluaran

## 🔎 Fitur Pencarian

Pengguna dapat mencari transaksi berdasarkan judul.

Hasil transaksi akan diperbarui secara langsung ketika pengguna
mengetikkan kata kunci pada kolom pencarian.

Ketika kolom pencarian dikosongkan, seluruh transaksi akan ditampilkan
kembali.

## 👩‍💻 Author

**Siti Nurhaliza**

