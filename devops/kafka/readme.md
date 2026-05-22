# Apache Kafka

## Publish Subscribe

Pada pola publish-subscribe, terdapat dua peran utama: publisher (produser) dan subscriber (konsumer). Publisher mengirimkan (publish) pesan ke sebuah topik tanpa mengetahui siapa yang akan menerima pesan tersebut. Sementara itu, subscriber berlangganan (subscribe) ke topik tertentu untuk menerima pesan yang dikirimkan ke topik tersebut. Pola ini memungkinkan komunikasi yang terdesentralisasi dan skalabilitas tinggi, karena publisher dan subscriber tidak saling bergantung secara langsung.

### Remote Procedure Calls (RPC)

Pada pola Remote Procedure Call (RPC), sebuah layanan (client) dapat meminta layanan lain (server) untuk menjalankan suatu fungsi atau prosedur secara remote, seolah-olah fungsi tersebut dijalankan secara lokal. Dalam implementasi berbasis pesan, client mengirimkan permintaan (request) ke sebuah channel atau topik, lalu server memproses permintaan tersebut dan mengirimkan balasan (response) ke channel atau topik lain yang telah disepakati. Pola ini mendukung komunikasi asinkron dan meningkatkan fleksibilitas

### contoh kasus

1. **Sistem Pemantauan Cuaca**: Dalam sistem pemantauan cuaca, data dari berbagai sensor cuaca (seperti suhu, kelembapan, dan tekanan udara) dapat dipublikasikan ke topik tertentu. Aplikasi lain yang tertarik dengan data ini dapat berlangganan ke topik tersebut untuk menerima pembaruan secara real-time.

2. **E-Commerce**: Pada platform e-commerce, setiap kali ada transaksi baru, informasi transaksi dapat dipublikasikan ke topik "transaksi". Layanan lain, seperti layanan analitik atau sistem manajemen inventaris, dapat berlangganan ke topik ini untuk memproses data transaksi lebih lanjut.

3. **Sistem Notifikasi**: Dalam aplikasi yang memerlukan notifikasi real-time, seperti aplikasi pesan instan, setiap pesan yang dikirimkan dapat dipublikasikan ke topik "pesan". Pengguna yang berlangganan ke topik ini akan menerima notifikasi setiap kali ada pesan baru.

### Diagram Messaging

![Publish Subscribe Diagram](https://www.umlboard.com/images/design-patterns/publisher-subscriber/pub-sub-sequence.svg)

## Pengenalan Kafka

Apache Kafka adalah platform streaming terdistribusi yang dirancang untuk memproses aliran data secara real-time. Kafka memungkinkan pengguna untuk mempublikasikan dan berlangganan aliran data, serta menyimpan dan memproses data tersebut dengan cara yang skalabel dan tahan terhadap kesalahan. Kafka sering digunakan dalam berbagai skenario, seperti pemantauan, analitik, dan integrasi sistem.
