# Contact App

Contact App adalah aplikasi sederhana untuk menyimpan daftar kontak menggunakan Node.js. Aplikasi ini dibuat secara bertahap dengan penambahan fitur di setiap versinya.

## Perkembangan Versi

### Contact App - 1
Pada versi pertama ini, beberapa fundamental telah dibuat, termasuk:
- Membuat file `app.js` sebagai main entry point aplikasi.
- Menggunakan beberapa built-in module Node.js, seperti:
  - `fs` (File System) untuk:
    - Membuat folder jika belum ada.
    - Membuat file JSON sebagai penyimpanan data kontak.
    - Membaca dan menulis data ke dalam file.
- Implementasi fungsi dasar untuk menambahkan kontak ke dalam file JSON.

### Contact App - 2
Pada versi kedua, beberapa fitur baru ditambahkan dengan bantuan modul dari npm, di antaranya:
- **Yargs** → Digunakan untuk menambahkan command-line interface (CLI), sehingga pengguna bisa menjalankan perintah seperti:
  - `node app.js --add --name="Nama" --email="Email" --nohp="Nomor HP"` untuk menambahkan kontak baru.
- **Validator** → Digunakan untuk memvalidasi input, termasuk:
  - Validasi email agar sesuai dengan format yang benar.
  - Validasi nomor handphone agar hanya menerima angka yang valid.
- **Chalk** → Digunakan untuk memberikan warna pada pesan di terminal:
  - Menampilkan pesan sukses jika data berhasil ditambahkan.
  - Menampilkan pesan error jika ada kesalahan dalam input.

### Contact App - 3
Pada versi ketiga, beberapa command baru ditambahkan untuk meningkatkan fungsionalitas aplikasi:
- **detail** → Menampilkan detail kontak berdasarkan nama tertentu.
  ```sh
  node app.js detail --name="Nama Kontak"
  ```
- **list** → Menampilkan semua kontak yang tersimpan dalam database.
  ```sh
  node app.js list
  ```
- **delete** → Menghapus kontak berdasarkan nama tertentu.
  ```sh
  node app.js delete --name="Nama Kontak"
  ```

## Cara Menggunakan
1. Clone repository ini.
2. Install dependencies dengan menjalankan:
   ```sh
   npm install
   ```
3. Jalankan aplikasi dengan perintah CLI sesuai dengan fitur yang tersedia.

## Teknologi yang Digunakan
- Node.js
- File System (fs)
- Yargs
- Validator
- Chalk

Versi selanjutnya akan menambahkan lebih banyak fitur untuk meningkatkan fungsionalitas aplikasi! 🚀
