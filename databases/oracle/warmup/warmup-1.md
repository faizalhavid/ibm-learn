## SQL Warmup: Gym Membership Management System

### 🧠 Case Study
Sebuah gym ingin membangun sistem database untuk mengelola:
- Data member dan keanggotaan
- Pelatih (trainer)
- Jadwal kelas
- Transaksi pembayaran
- Kehadiran kelas

---

### 🔰 Phase 1: Creating Database Structure (DDL)

#### Task 1.1
Buat database bernama `GymDB`.

#### Task 1.2
Buat tabel `Trainers` dengan kolom:
- `trainer_id` (PK, AUTO_INCREMENT)
- `name` (varchar, wajib)
- `specialty` (varchar, opsional)

#### Task 1.3
Buat tabel `Members`:
- `member_id` (PK, AUTO_INCREMENT)
- `name` (varchar, wajib)
- `email` (varchar, unik)
- `join_date` (date)

#### Task 1.4
Buat tabel `Classes`:
- `class_id` (PK, AUTO_INCREMENT)
- `class_name` (varchar)
- `trainer_id` (FK ke `Trainers`)
- `schedule` (datetime)

#### Task 1.5
Buat tabel `Payments`:
- `payment_id` (PK, AUTO_INCREMENT)
- `member_id` (FK ke `Members`)
- `amount` (decimal)
- `payment_date` (date)

#### Task 1.6
Buat tabel `Attendance`:
- `attendance_id` (PK, AUTO_INCREMENT)
- `member_id` (FK ke `Members`)
- `class_id` (FK ke `Classes`)
- `attend_date` (date)


### DDL (Data Definition Language)

#### Task DDL 1
Tambahkan kolom `phone_number` (varchar, opsional) ke tabel `Members`.

#### Task DDL 2
Ubah tipe data kolom `amount` pada tabel `Payments` menjadi NUMBER(10,2).

#### Task DDL 3
Hapus kolom `specialty` dari tabel `Trainers`.

#### Task DDL 4
Buat index pada kolom `email` di tabel `Members`.

#### Task DDL 5
Buat sequence `seq_member_id` untuk auto increment pada `member_id` (karena Oracle tidak punya AUTO_INCREMENT).

---

### DML (Data Manipulation Language)

#### Task DML 1
Update nama member dengan `member_id = 2` menjadi "Budi Santoso".

#### Task DML 2
Hapus data pembayaran dengan `payment_id = 1`.

#### Task DML 3
Update semua member yang belum pernah melakukan pembayaran menjadi status "Inactive" (tambahkan kolom status jika perlu).

#### Task DML 4
Masukkan 2 data ke tabel `Attendance` untuk member yang sama pada dua kelas berbeda.

#### Task DML 5
Hapus semua kehadiran (Attendance) untuk kelas dengan `class_id = 3`.

---

**Catatan:**  
- Gunakan sintaks Oracle SQL.
- Untuk beberapa task, kamu bisa menyesuaikan struktur tabel jika diperlukan (misal, menambah kolom status).

---

### 📥 Phase 2: Data Insertion (DML)

#### Task 2.1
Masukkan 3 pelatih ke tabel `Trainers`.

#### Task 2.2
Masukkan minimal 5 member.

#### Task 2.3
Masukkan 3 kelas yang berbeda.

#### Task 2.4
Simulasikan 2 pembayaran oleh member berbeda.

#### Task 2.5
Catat kehadiran 2 member pada 2 kelas berbeda.

---

### 🔎 Phase 3: Basic Queries (SELECT, JOIN)

#### Task 3.1
Tampilkan daftar semua kelas beserta nama pelatihnya.

#### Task 3.2
Tampilkan semua pembayaran yang dilakukan oleh member bernama "Siti".

#### Task 3.3
Tampilkan kehadiran kelas untuk member tertentu (misal, `member_id = 1`).

---

### 📊 Phase 4: Intermediate Queries (GROUP BY, HAVING, LIKE, SUBQUERY)

#### Task 4.1
Tampilkan total pendapatan dari semua pembayaran.

#### Task 4.2
Tampilkan 3 member dengan kehadiran terbanyak.

#### Task 4.3
Tampilkan kelas yang dihadiri lebih dari 2 member.

---

### 🧩 Phase 5: Advanced Queries (VIEW, CTE, WINDOW FUNCTION)

#### Task 5.1
Buat VIEW `active_members` berisi member yang pernah hadir minimal 2 kali.

#### Task 5.2
Gunakan CTE untuk menampilkan pelatih dengan jumlah kelas terbanyak.

#### Task 5.3
Gunakan `RANK()` untuk mengurutkan member berdasarkan total pembayaran terbesar.

---

### ⚙️ Phase 6: Advanced Manipulation (UPDATE, DELETE, TRIGGER)

#### Task 6.1
Update data keanggotaan member (misal, upgrade status) secara langsung.

#### Task 6.2
Buat TRIGGER untuk otomatis menambah kehadiran setelah data dimasukkan ke `Attendance`.

#### Task 6.3
Hapus seorang pelatih beserta semua kelas yang diasuhnya secara cascading (`ON DELETE CASCADE`).