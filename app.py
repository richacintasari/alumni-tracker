from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index():
    conn = get_db()
    alumni = conn.execute("SELECT * FROM alumni").fetchall()
    conn.close()
    return render_template("index.html", alumni=alumni)

@app.route("/tambah", methods=["GET","POST"])
def tambah():

    if request.method == "POST":

        nama = request.form["nama"]
        prodi = request.form["prodi"]
        tahun = request.form["tahun"]

        conn = get_db()

        conn.execute(
        "INSERT INTO alumni (nama,prodi,tahun,status) VALUES (?,?,?,?)",
        (nama,prodi,tahun,"Belum Dilacak")
        )

        conn.commit()
        conn.close()

        return redirect("/")

    return render_template("tambah_alumni.html")

@app.route("/lacak/<int:id>")
def lacak(id):

    conn = get_db()

    status = "Teridentifikasi"

    conn.execute(
    "UPDATE alumni SET status=? WHERE id=?",
    (status,id)
    )

    conn.commit()
    conn.close()

    return redirect("/")

@app.route("/delete/<int:id>")
def delete(id):

    conn = get_db()

    conn.execute("DELETE FROM alumni WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return redirect("/")

@app.route("/edit/<int:id>", methods=["GET","POST"])
def edit(id):

    conn = get_db()

    if request.method == "POST":

        nama = request.form["nama"]
        prodi = request.form["prodi"]
        tahun = request.form["tahun"]

        conn.execute(
        "UPDATE alumni SET nama=?,prodi=?,tahun=? WHERE id=?",
        (nama,prodi,tahun,id)
        )

        conn.commit()
        conn.close()

        return redirect("/")

    alumni = conn.execute(
    "SELECT * FROM alumni WHERE id=?", (id,)
    ).fetchone()

    conn.close()

    return render_template("edit_alumni.html", alumni=alumni)

app.run(debug=True)