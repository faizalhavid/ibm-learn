## SQL Intermediate: Gym Membership Management System (PL/SQL & Stored Procedure)

### 🧠 Case Study
Sebuah gym ingin meningkatkan otomatisasi dan analisis data dengan fitur PL/SQL seperti stored procedure, function, dan exception handling.

---

### 🔧 Phase 1: Stored Procedure & Function

#### Task 1.1
Buat **stored procedure** `add_payment` yang menerima parameter `p_member_id`, `p_amount`, dan otomatis mengisi tanggal pembayaran dengan tanggal hari ini.

#### Task 1.2
Buat **stored procedure** `register_attendance` yang menerima `p_member_id` dan `p_class_id`, lalu menambahkan data ke tabel `Attendance` dengan tanggal hari ini.

#### Task 1.3
Buat **function** `get_total_payment` yang menerima `p_member_id` dan mengembalikan total pembayaran yang sudah dilakukan member tersebut.

#### Task 1.4
Buat **function** `get_attendance_count` yang menerima `p_member_id` dan mengembalikan jumlah kehadiran member tersebut.

---

### ⚠️ Phase 2: Exception Handling

#### Task 2.1
Modifikasi procedure `add_payment` agar menampilkan pesan error jika `p_amount` kurang dari atau sama dengan 0.

#### Task 2.2
Buat procedure `delete_member` yang akan menghapus member berdasarkan `p_member_id`. Jika member tidak ditemukan, tampilkan pesan error.

---

### 🔄 Phase 3: Cursor & Loop

#### Task 3.1
Buat procedure `list_active_members` yang menampilkan semua member yang pernah hadir minimal 2 kali (gunakan cursor dan loop).

#### Task 3.2
Buat procedure `update_all_member_status` yang akan mengubah status semua member menjadi 'Active' jika sudah membayar lebih dari 1 kali.

---

### 📝 Phase 4: Dynamic SQL

#### Task 4.1
Buat procedure `update_trainer_specialty` yang menerima nama pelatih dan specialty baru, lalu melakukan update menggunakan dynamic SQL.

---

### 🧪 Phase 5: Testing

#### Task 5.1
Tulis contoh pemanggilan procedure/function di atas menggunakan `EXECUTE` atau `SELECT`.

---

**Catatan:**  
Gunakan sintaks PL/SQL Oracle.  
Pastikan setiap procedure/function menggunakan parameter dan exception handling yang sesuai.