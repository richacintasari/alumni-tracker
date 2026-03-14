import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS alumni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    prodi TEXT,
    tahun TEXT,
    status TEXT
)
""")

conn.commit()
conn.close()

print("Database berhasil dibuat")