# Networking Cheat Sheet

Networking adalah bidang luas yang mencakup berbagai protokol, model, dan teknologi. Cheat sheet ini berisi ringkasan cepat tentang konsep penting dalam jaringan komputer.

## Model OSI (Open Systems Interconnection)

Model OSI adalah kerangka kerja konseptual yang digunakan untuk memahami dan mengatur protokol jaringan dalam tujuh lapisan. Setiap lapisan memiliki fungsi spesifik dan berinteraksi dengan lapisan di atas dan bawahnya. Model ini terbagi menjadi dua kelompok utama: lapisan atas (Application, Presentation, Session) dan lapisan bawah (Transport, Network, Data Link, Physical). Model OSI sangat berguna untuk desain jaringan, pemecahan masalah, dan memastikan perangkat yang berbeda bisa saling terhubung.

![Model OSI](https://s7280.pcdn.co/wp-content/uploads/2018/06/osi-model-7-layers-1.png)

## Lapisan-lapisan Model OSI

### Lapisan 1: Physical Layer (Lapisan Fisik)

Lapisan ini mengatur hubungan fisik antara perangkat jaringan. Contohnya perangkat keras seperti kabel, switch, dan kartu jaringan (NIC) yang mengirimkan data dalam bentuk bit (0 dan 1) lewat media fisik. Layer ini menentukan aturan listrik, mekanik, dan cara pengiriman sinyal data.

- **Protokol**: Ethernet, USB, Bluetooth, DSL, ISDN
- **Perangkat**: Hub, repeater, NIC, modem
- **Fungsi**: Mengirim bit, modulasi sinyal, pengkodean sinyal, alamat fisik
- **Contoh**:
  - Kabel Ethernet (Cat5, Cat6)
  - Kabel serat optik
  - Sinyal nirkabel (Wi-Fi, Bluetooth)
- **Konsep Penting**:
  - Bit rate: Jumlah bit yang dikirim per detik
  - Media transmisi: Media fisik yang digunakan (tembaga, serat, udara)
  - Pengkodean sinyal: Cara merepresentasikan data sebagai sinyal listrik atau optik
  - Modulasi: Cara mengubah sinyal pembawa agar bisa bawa data
  - Topologi: Susunan fisik perangkat dalam jaringan (star, bus, ring)

### Lapisan 2: Data Link Layer (Lapisan Data Link)

Lapisan ini menjamin koneksi yang andal antara dua perangkat yang langsung terhubung. Fungsi utamanya adalah mendeteksi dan memperbaiki kesalahan serta mengatur aliran data. Lapisan ini terdiri dari dua bagian: Logical Link Control (LLC) dan Media Access Control (MAC).

- **Protokol**: Ethernet, PPP, HDLC, Frame Relay, ATM
- **Perangkat**: Switch, bridge, NIC
- **Fungsi**: Membingkai data, deteksi dan koreksi error, kontrol aliran, alamat MAC
- **Contoh**:
  - Frame Ethernet
  - Alamat MAC
  - Protokol PPP
- **Konsep Penting**:
  - Frame: Paket data di lapisan data link yang berisi header dan trailer
  - Alamat MAC: Identitas unik untuk perangkat jaringan
  - Deteksi error: Cara menemukan kesalahan data (CRC, checksum)
  - Kontrol aliran: Mengatur kecepatan pengiriman data
  - Switching: Mengirim frame berdasarkan alamat MAC

### Lapisan 3: Network Layer (Lapisan Jaringan)

Lapisan ini mengatur pengiriman paket data antar jaringan. Tugasnya memilih jalur terbaik dan memberikan alamat logis berupa IP. Layer ini penting untuk menghubungkan berbagai jaringan dan membuat perangkat bisa berkomunikasi walau berbeda jaringan.

- **Protokol**: IP (IPv4, IPv6), ICMP, ARP, RIP, OSPF, BGP
- **Perangkat**: Router, switch layer 3
- **Fungsi**: Routing, pengalamatan logis, meneruskan paket, fragmentasi paket
- **Contoh**:
  - Alamat IP (IPv4 dan IPv6)
  - Tabel routing
  - Protokol ICMP
- **Konsep Penting**:
  - Alamat IP: Identitas perangkat di jaringan untuk routing
  - Subnetting: Membagi jaringan jadi subnet kecil
  - Routing: Menentukan jalur terbaik untuk paket
  - Paket: Unit data yang dikirim lewat jaringan
  - NAT: Mengubah alamat IP privat ke publik

### Lapisan 4: Transport Layer (Lapisan Transport)

Lapisan ini bertanggung jawab untuk komunikasi antar perangkat secara end-to-end. Menjamin data sampai dengan benar, mengatur pengiriman ulang jika ada kesalahan, dan mengontrol kecepatan pengiriman.

- **Protokol**: TCP, UDP, SCTP
- **Perangkat**: Gateway, firewall
- **Fungsi**: Membagi data, menyusun ulang, mengatasi error, kontrol aliran
- **Contoh**:
  - Segmen TCP
  - Datagram UDP
  - Nomor port (HTTP: 80, HTTPS: 443)
- **Konsep Penting**:
  - TCP: Protokol koneksi yang andal
  - UDP: Protokol tanpa koneksi yang lebih cepat tapi kurang andal
  - Port: Nomor yang menandai aplikasi tertentu
  - Segmentasi: Memecah data besar jadi kecil
  - Kontrol aliran: Mengatur kecepatan transfer data

### Lapisan 5: Session Layer (Lapisan Sesi)

Lapisan ini mengelola sesi komunikasi antara aplikasi. Mengatur pembukaan, pemeliharaan, dan penutupan koneksi agar komunikasi berjalan lancar dan data tetap sinkron.

- **Protokol**: NetBIOS, RPC, PPTP
- **Fungsi**:
  - Membuka dan menutup sesi
  - Sinkronisasi komunikasi
  - Mengatur mode dialog (setengah/full duplex)
- **Contoh**:
  - Sesi login pengguna
  - Sesi konferensi video

### Lapisan 6: Presentation Layer (Lapisan Presentasi)

Lapisan ini bertugas menerjemahkan data dari aplikasi supaya bisa dipahami oleh jaringan dan sebaliknya. Juga menangani enkripsi dan kompresi data.

- **Protokol dan Format**: SSL/TLS, JPEG, MPEG, ASCII
- **Fungsi**:
  - Konversi format data
  - Enkripsi dan dekripsi
  - Kompresi dan dekompresi data
- **Contoh**:
  - Enkripsi HTTPS dengan TLS
  - Konversi format gambar

### Lapisan 7: Application Layer (Lapisan Aplikasi)

Lapisan paling atas yang langsung berinteraksi dengan pengguna atau aplikasi. Menyediakan protokol agar aplikasi bisa menggunakan jaringan seperti browsing, email, dan transfer file.

- **Protokol**: HTTP, HTTPS, FTP, SMTP, IMAP, DNS, DHCP
- **Fungsi**:
  - Memberi layanan langsung ke aplikasi
  - Autentikasi pengguna dan keamanan
  - Berbagi sumber daya dan akses file jarak jauh
- **Contoh**:
  - Browser web menggunakan HTTP/HTTPS
  - Klien email mengirim dan menerima pesan

---

## Tabel Ringkasan Lapisan OSI

| Lapisan | Nama       | Fungsi                       | Unit Data       | Contoh Protokol/Perangkat  |
| ------- | ---------- | ---------------------------- | --------------- | -------------------------- |
| 7       | Aplikasi   | Layanan langsung ke pengguna | Data            | HTTP, FTP, SMTP, DNS       |
| 6       | Presentasi | Terjemah, enkripsi, kompresi | Data            | SSL/TLS, JPEG, MPEG        |
| 5       | Sesi       | Kelola sesi komunikasi       | Data            | NetBIOS, RPC, PPTP         |
| 4       | Transport  | Transfer data end-to-end     | Segmen/Datagram | TCP, UDP                   |
| 3       | Jaringan   | Routing dan pengalamatan     | Paket           | IP, ICMP, OSPF             |
| 2       | Data Link  | Transfer data antar node     | Frame           | Ethernet, PPP, MAC Address |
| 1       | Fisik      | Transmisi bit secara fisik   | Bit             | Kabel Ethernet, Wi-Fi      |

## IP Address

IP Address adalah alamat unik yang diberikan kepada setiap perangkat dalam jaringan agar bisa saling berkomunikasi. Ada dua jenis IP yang umum digunakan: IPv4 dan IPv6.

### Format IP Address

- **IPv4**  
  Format IPv4 menggunakan 32 bit dan biasanya ditulis dalam bentuk desimal dengan empat oktet, dipisahkan oleh titik.  
  Contoh: `192.168.1.1`  
  Setiap oktet bernilai antara 0 hingga 255.

- **IPv6**  
  IPv6 menggunakan 128 bit dan ditulis dalam delapan kelompok hexadecimal, dipisahkan oleh tanda titik dua (`:`).  
  Contoh: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`  
  IPv6 dibuat untuk mengatasi keterbatasan jumlah alamat IPv4.

### Rumus dan Penghitungan IP Address

- **Subnet Mask (IPv4)**  
  Subnet mask digunakan untuk menentukan bagian mana dari IP address yang menunjukkan jaringan dan bagian mana yang menunjukkan host.  
  Contoh subnet mask: `255.255.255.0`  
  Jika IP address adalah `192.168.1.10` dan subnet mask `255.255.255.0`, maka:

  - Network portion: `192.168.1.0`
  - Host portion: `10`

- **CIDR Notation**  
  CIDR (Classless Inter-Domain Routing) menunjukkan berapa bit yang digunakan untuk network prefix.  
  Contoh: `192.168.1.0/24` berarti 24 bit pertama adalah network, sisanya host.

### Komunikasi Menggunakan IP Address

1. **Pengalamatan Unicast**  
   Data dikirim dari satu perangkat ke perangkat lain yang spesifik dengan IP address tertentu.

2. **Broadcast (IPv4 saja)**  
   Data dikirim ke semua perangkat dalam satu jaringan subnet tertentu. Contoh alamat broadcast: `192.168.1.255`

3. **Multicast**  
   Data dikirim ke sekelompok perangkat yang tergabung dalam grup multicast.

### Cara Kerja IP dalam Komunikasi

- Ketika sebuah perangkat ingin mengirim data ke IP tertentu, data dibagi menjadi paket-paket.
- Paket diberi header yang berisi alamat IP tujuan dan sumber.
- Router di jaringan akan membaca alamat tujuan dan mengarahkan paket ke jaringan yang tepat.
- Jika alamat IP tujuan berada di jaringan yang sama, paket langsung dikirimkan melalui switch.
- Jika tidak, paket dikirim ke gateway (router) untuk diteruskan ke jaringan tujuan.

### Contoh Penggunaan IP Address

- Mengakses website: Perangkat mengirim permintaan ke server dengan IP website tersebut.
- Email: Server email mengirim dan menerima pesan dengan alamat IP perangkat pengguna.
- Game online: Menghubungkan pemain dengan server game menggunakan IP.
