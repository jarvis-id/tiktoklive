# 🚀 TikTok LIVE Reader - jarvis-id

Aplikasi berbasis web murni (Client-side) yang dirancang untuk membaca **Chat Real-time** dan **Hadiah (Gift)** dari siaran langsung TikTok secara otomatis. Aplikasi ini dikembangkan untuk dihosting secara gratis melalui **GitHub Pages** tanpa memerlukan server backend tambahan [1, 2].

**Tautan Aplikasi:** [https://jarvis-id.github.io/tiktoklive/](https://jarvis-id.github.io/tiktoklive/)

## ✨ Fitur Utama

- **Target LIVE Dinamis:** Tersedia kolom input untuk memasukkan `unique_id` (username) host TikTok yang sedang melakukan siaran langsung [3].
- **Pembaca Chat Real-time:** Menampilkan pesan obrolan dari pemirsa secara instan menggunakan koneksi WebSocket yang persisten [4, 5].
- **Deteksi Hadiah (Gift):** Membaca kiriman hadiah, termasuk dukungan untuk fitur **streak** (hadiah beruntun) dengan memantau properti `repeatCount` dan `repeatEnd` [6, 7].
- **Arsitektur Tanpa Backend:** Memanfaatkan SDK **Playroom Kit** untuk menangani tanda tangan kriptografis TikTok yang kompleks (seperti X-Bogus dan msToken) langsung dari sisi klien [2, 8, 9].
- **Ringan & Responsif:** Dibangun dengan teknologi web standar (HTML5, CSS, dan JavaScript murni).

## 🛠️ Aturan TikTok LIVE Connect

Berdasarkan regulasi dan infrastruktur fungsional TikTok:
1. **Status Siaran:** Target akun **wajib dalam status LIVE** saat aplikasi mencoba menghubungkan [10].
2. **Kriteria Host:** Umumnya, fitur LIVE dan Gift hanya tersedia untuk akun yang telah memenuhi ambang batas (biasanya **1.000 pengikut** dan usia **18 tahun ke atas**) [11-13].
3. **Data Publik:** Aplikasi ini hanya mengakses dan mendekode data yang tersedia secara publik di ruang siaran melalui protokol Webcast TikTok [3, 14].

## 🏗️ Arsitektur Teknis

Aplikasi ini berinteraksi dengan layanan internal TikTok menggunakan teknik rekayasa balik (*reverse engineering*):
- **Protocol Buffers (Protobuf):** Data biner dari server TikTok didekodekan menjadi objek JSON yang dapat dibaca manusia [4, 15].
- **WebSocket:** Digunakan untuk menjaga aliran data interaksi tetap stabil dengan latensi rendah (di bawah 50ms) [16, 17].
- **ByteDance Anti-Crawler Bypass:** Menggunakan perantara untuk menghasilkan tanda tangan digital unik agar koneksi tidak diblokir oleh sistem pertahanan TikTok [18, 19].

## 🚀 Cara Penggunaan

1. Kunjungi tautan proyek di `https://jarvis-id.github.io/tiktoklive/`.
2. Masukkan **Username TikTok** host (tanpa simbol `@`) pada kolom yang tersedia.
3. Pastikan host tersebut sedang menyiarkan LIVE.
4. Klik tombol **Hubungkan**.
5. Aliran chat dan notifikasi hadiah akan muncul secara otomatis di layar.

## 📦 Cara Hosting di GitHub.io

1. Pastikan file `index.html` dan skrip JavaScript Anda berada di direktori utama repositori.
2. Buka tab **Settings** di repositori GitHub Anda.
3. Pilih menu **Pages** di bilah sisi.
4. Pada bagian **Build and deployment**, pilih branch `main`.
5. Tunggu hingga GitHub memberikan tautan publik untuk situs Anda.

## ⚠️ Pernyataan Penyangkalan (Disclaimer)

Aplikasi ini bersifat **tidak resmi (unofficial)** dan tidak berafiliasi dengan TikTok atau ByteDance Ltd [20]. Karena API TikTok LIVE bersifat eksperimental dan didasarkan pada rekayasa balik protokol internal, fungsionalitas aplikasi dapat terhenti sewaktu-waktu jika TikTok memperbarui skema **Protobuf** atau mekanisme keamanan mereka [14, 21].

---
**Lisensi:** MIT  
**Author:** [jarvis-id](https://github.com/jarvis-id)
