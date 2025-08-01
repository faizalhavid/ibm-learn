# 📚 Library Management System (Java OOP Warmup)

## 🎯 Deskripsi Proyek
Buat sistem manajemen perpustakaan sederhana di mana pengguna dapat meminjam dan mengembalikan buku. Sistem harus mendukung pengelolaan data buku, anggota, dan transaksi peminjaman.

---

## 📐 UML Class Diagram (Markdown Version)

```mermaid
classDiagram
    class Book {
        - title: String
        - author: String
        - isAvailable: boolean
        + borrow(): void
        + returnBook(): void
    }

    class Member {
        - name: String
        - memberId: String
        - borrowedBooks: List<Book>
        + borrowBook(book): void
        + returnBook(book): void
    }

    class Library {
        - books: List<Book>
        - members: List<Member>
        + addBook(book): void
        + registerMember(member): void
        + borrowBook(member, book): void
        + returnBook(member, book): void
    }

    Library "1" o-- "*" Book
    Library "1" o-- "*" Member
    Member "1" o-- "*" Book : borrowedBooks
```

## 🧾 OOP Cheatsheet (Java)

### 1. Encapsulation (Enkapsulasi)
- Menyembunyikan detail internal objek.
- Gunakan `private` untuk properti.
- Sediakan akses melalui `getter` dan `setter`.

### 2. Abstraction (Abstraksi)
- Menyembunyikan kompleksitas logika.
- Gunakan `abstract class` atau `interface` untuk mendesain kerangka umum.
- Implementasi diserahkan ke subclass.

### 3. Inheritance (Pewarisan)
- Kelas dapat mewarisi properti dan metode dari kelas lain.
- Gunakan `extends`.
- Subclass bisa menambahkan atau meng-override method.

### 4. Polymorphism (Polimorfisme)
- Method dengan nama yang sama namun perilaku berbeda.
  - **Overriding**: Menimpa method dari parent class.
  - **Overloading**: Nama method sama, parameter berbeda.

---

## 💡 Challenge Tambahan (Opsional)
- Tambahkan class `Librarian` dengan hak akses khusus.
- Buat `abstract class` bernama `User` sebagai parent dari `Member` dan `Librarian`.
- Buat interface `Printable` untuk mencetak data buku dan anggota.

---

## ✅ Tujuan Pembelajaran
- Memahami dan menerapkan prinsip-prinsip OOP: Encapsulation, Abstraction, Inheritance, dan Polymorphism.
- Mendesain sistem sederhana namun modular dan scalable.
