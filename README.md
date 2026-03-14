# Sistem Pelacakan Alumni

Website ini digunakan untuk membantu admin kampus melacak alumni dari berbagai sumber publik.

## Teknologi
- Python Flask
- HTML
- Bootstrap
- SQLite

## Cara Menjalankan

Install dependencies

pip install -r requirements.txt

Buat database

python init_db.py

Jalankan aplikasi

python app.py

Buka di browser

http://127.0.0.1:5000

## Pengujian Sistem

| No | Fitur | Skenario Test | Hasil Yang Diharapkan | Hasil |
|----|------|---------------|-----------------------|------|
|1|Tambah Alumni|Admin memasukkan data alumni|Data tersimpan|Berhasil|
|2|Edit Alumni|Admin mengubah data alumni|Data berhasil diperbarui|Berhasil|
|3|Delete Alumni|Admin menghapus data|Data terhapus|Berhasil|
|4|Pelacakan Alumni|Klik tombol lacak|Status berubah|Berhasil|
|5|Dashboard|Menampilkan data alumni|Data tampil di tabel|Berhasil|