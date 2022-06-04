# GrassClipper
[EN](README.md) | [PL](README_PL.md) | ID | [RU](README_ru.md)

Peluncur eksperimental Grasscutter untuk memudahkan penggantian antara server resmi (Official) dan server pribadi

[Unduh Disini!](https://github.com/Grasscutters/GrassClipper/releases/) (Mendukung Windows 8 keatas)

*\*Catatan: Beberapa terjemahan mungkin ada yang sudah usang, kalau ada bahasa Inggris yang muncul secara acak pada teks atau opsi pilihan mungkin ini penyebabnya. Jika kamu melihat masalah seperti ini, jangan ragu untuk membuat pull request!*

# Daftar Isi

* [Setup (untuk pengguna)](#setup-untuk-pengguna)
* [Setup (untuk pengembang)](#setup-untuk-pengembang)
* [Daftar yang Harus Dilakukan](#daftar-yang-harus-dilakukan)
* [Masalah Umum](#punya-masalah)
  * [Pemasangan Proxy Tidak Terbuka/Gagal](#pemasangan-manual-proxy)
  * [Perbaikan Layar Putih](#perbaikan-layar-putih)
  * [Kesalahan 502](#kesalahan-502)
  * [Kesalahan 4206](#kesalahan-4206)
  * [Jendela CMD Terbuka Terus-menerus](#jendela-cmd-terbuka-terus-menerus)
  * [Discord/Youtube Tidak Berfungsi dengan Baik](#discord-tidak-bisa-mengirim-pesan-atau-memuat-gambar-atau-youtube-tidak-tampil-dengan-baik)
  * [Tidak Ada Koneksi Internet](#komputerku-tidak-ada-akses-internet-setelah-menutup-peluncur-atau-restart)
* [Bahasa dan Kredit Terjemahan](#bahasa-yang-tersedia-dan-kredit-penerjemah)
* [Tangkapan Layar](#tangkapan-layar)

# Setup (untuk Pengguna)

1. Unduh file zip nya
2. Ekstrak file zip nya di sembarang tempat atau tempat yang sudah ditentukan
3. Jalankan `GrassClipper.exe`, pasang server proxy nya, dan atur folder game nya!

# Setup (untuk Pengembang)

0. Clone/unduh repositori ini
1. Pastikan kamu punya [NodeJS](https://nodejs.org/en/download/) yang sudah terpasang.
2. Pasang alat CLI `neu`: `npm install -g @neutralinojs/neu`
3. Pasang dependensinya: `setup_win.cmd`
4. Kompilasi dan jalankan:
   * Untuk pengujian: `npm run dev`
   * Untuk produksi: `npm run build`

# Daftar yang Harus Dilakukan

* Antarmuka/internal
  * [x] UI
  * [x] Opsi server resmi (Official) dan pribadi
  * [x] IP server masukan
  * [x] Penataan gaya CSS yang wah! (Seperti gaya menu vertikal ala CoD: MW 2019 untuk memilih antara server resmi (official) dan pribadi? [Lihat disini](https://charlieintel.com/wp-content/uploads/2020/11/MW-new-menu.png))
  * [x] Skrip saklar mati (opsional)
  * [x] Otomatis menjalankan `install.cmd` ketika membuka GrassClipper untuk pertama kalinya
  * [x] Pengunduh otomatis Grasscutter
  * [ ] Deteksi saat berada di folder yang tidak dapat diakses oleh program (contohnya `C:/Program Files`) dan ingatkan
  * [ ] Gambar kustom untuk bagian server pribadi (siapapun dipersilahkan mengirimkan pull request untuk menambahkan gambar lainnya!)
  * [x] Nama pengguna/kata sandi opsional sebelum memasuki server (belum terimplementasi di Grasscutter)
  * [ ] Deteksi platform dan skrip bash
  * [ ] Pembuat spanduk terintegrasi
* Layanan Proxy
  * [x] Server lokal proxy
  * [x] Cegat dan ubah permintaan GI seperti dengan Fiddler, izinkan yang lain melewati
  * [ ] Perbaiki masalah Discord dan YouTube saat proxy diaktifkan (mungkin diperbaiki)

# Punya masalah?

Dibawah ini mungkin beberapa skenario yang kamu hadapi dan beserta solusinya.

# Pemasangan Manual Proxy

Jika kamu punya masalah saat memasang server proxy, kamu juga dapat memasangnya secara manual. Cara memasangnya:
1. Buat sebuah folder yang bernama `ext` di folder GrassClipper jika folder tersebut tidak ada.
2. Unduh dan ekstrak isi konten dari [file ini](https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-windows.zip) ke dalam folder `ext`
3. Klik dua kali `mitmdump.exe` dan izinkan untuk menjalankan beberapa detik agar bisa membuat sertifikat
4. Jalankan perintah ini sebagai Administrator: `certutil -addstore root "%USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer"`
5. Gunakan GrassClipper seperti biasa!

## Perbaikan Layar Putih

Mengalami layar putih? [Pastikan WebView2 terpasang](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download)

Kamu mungkin perlu menjalankan perintah ini sebagai Administrator:
`CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"`

Jika kamu mempunyai karakter Cina di jalur file mu, mungkin ini dapat menyebabkan crash! Saya sedang mengerjakan perbaikannya.

Kamu mungkin bisa juga menjalankan ini di mode kompatibilitas Windows 8.

Jika semuanya gagal, kamu bisa menjalankan GrassClipper di mode `chrome` atau `browser`. Cara melakukannya:
* Buat sebuah shortcut ke `GrassClipper.exe`
* Klik kanan shortcut tersebut, lalu klik `Properties`
* Di dalam kotak `Target`, pada bagian akhirnya, tambahkan ` --mode=chrome` atau ` --mode=browser`
  * `chrome` hanya bisa bekerja jika kamu punya Chrome yang terpasang dan akan membuat jendela Chrome
  * Untuk `browser` seperti yang kamu tebak, akan membuka GrassClipper di default browser mu
* Klik `Ok`
* Jalankan GrassClipper dengan menggunakan shortcut ini mulai dari sekarang!

## Kesalahan 502

1. Jika kamu menjalankan ini di server lokal, pastikan server lokal tersebut berjalan dengan baik. Sebaliknya, pastikan server yang kamu hubungkan juga berjalan dengan baik.

2. Kalau bisa, [gunakan versi pengembangan Grasscutter](https://github.com/Grasscutters/Grasscutter/tree/development). Biasanya versi ini bekerja dengan baik di GrassClipper.

Jika kamu masih mendapatkan kesalahan 502 ketika mencoba masuk ke servermu sendiri, buka file konfigurasi Grasscutter dan tambahkan pada bagian `DispatchServer`:

```json
"PublicPort": PORT_MU
```
dimana `PORT_MU` itu sama dengan port yang kamu gunakan sebagai nilai `Port`. Biasanya diisi dengan nilai 443.

## Kesalahan 4206

Pastikan kamu punya file `keystore.p12` dari versi yang kamu pilih (`stabil` atau `pengembangan`). Dan juga pastikan kata sandinya diatur dengan benar di file `config.json` pada Grasscutters (kosong untuk `stabil`, "123456" untuk `pengembangan`).

## Jendela CMD Terbuka Terus-menerus

Jika kamu mendapatkan jendela CMD yang terbuka secara terus-menerus dari beberapa skrip (seperti pemasangan proxy atau saat menjalankan server pribadi), pastikan kamu punya UAC (User Access Control) yang diatur pada opsi yang memunculkan dialog permintaan izin menjalankan. Pastikan juga akun penggunamu (user account) bisa dibuka dengan perizinan Admin.

## Discord Tidak Bisa Mengirim Pesan atau Memuat Gambar atau Youtube Tidak Tampil dengan Baik

Discord/YouTube (dan beberapa aplikasi lainnya) sepertinya tidak menyukai server proxy mu. Kamu mungkin perlu menonaktifkannya dengan menutup mitmdump atau dengan menonaktifkan proxy mu di pengaturan Windows proxy.

## Komputerku Tidak Ada Akses Internet Setelah Menutup Peluncur atau Restart!

Sepertinya peluncur tidak menutup dengan benar dan tidak bisa membersihkan pengaturan proxy seperti semula. Nonaktifkan proxy mu di pengaturan Windows proxy.

# Bahasa yang Tersedia dan Kredit Penerjemah

Terima kasih kepada semua orang yang telah menyediakan terjemahan! <3

* ZH - nuoxianCN, Scirese & MrAru
* ZH-TW - Kimi & KormiMeiko
* PT-BR - na.na
* VIE - labalityowo & lunaticwhat
* ID - Iqrar99 & nautilust
* FR - linsorak & memetrollsXD
* ES - memetrollsXD
* ND - memetrollsXD
* RU - fitiskin
* TR - lilmayofuksu
* JP - conochy
* HD - Arikatsu
* PL - zakhil-dev

# Tangkapan Layar

![image](https://user-images.githubusercontent.com/25207995/164574276-645548c2-7ba6-47c3-8df4-77082003648f.png)
![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
![image](https://user-images.githubusercontent.com/25207995/164882735-77aa535c-0e93-4b32-af7c-f8b59888257a.png)
![image](https://user-images.githubusercontent.com/25207995/164882716-c9f16cd0-c0b6-4c0a-ae9e-4c95da9ef7f5.png)


