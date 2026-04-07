import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("login");

    if (!isLogin) {
      router.push("/login");
      return;
    }

    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("alumni")
      .select("*");

    if (error) {
      console.log("ERROR:", error);
    } else {
      console.log("DATA:", data);
      setData(data);
    }
  }

  // 🔥 FILTER
  const filteredData =
    filter === "Semua"
      ? data
      : data.filter((item) => item.status === filter);

  // 🔥 STATISTIK
  const total = data.length;
  const pns = data.filter((d) => d.status === "PNS").length;
  const swasta = data.filter((d) => d.status === "Swasta").length;
  const wirausaha = data.filter((d) => d.status === "Wirausaha").length;

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
      
      <h1>🎓 Dashboard Alumni</h1>

      <button
        onClick={() => {
          localStorage.removeItem("login");
          router.push("/login");
        }}
      >
        Logout
      </button>

      <br /><br />

      {/* STATISTIK */}
      <div style={styles.statsContainer}>
        <div style={styles.cardStat}>Total<br/><b>{total}</b></div>
        <div style={styles.cardStat}>PNS<br/><b>{pns}</b></div>
        <div style={styles.cardStat}>Swasta<br/><b>{swasta}</b></div>
        <div style={styles.cardStat}>Wirausaha<br/><b>{wirausaha}</b></div>
      </div>

      <br />

      {/* FILTER */}
      <select onChange={(e) => setFilter(e.target.value)} style={styles.filter}>
        <option>Semua</option>
        <option>PNS</option>
        <option>Swasta</option>
        <option>Wirausaha</option>
      </select>

      <br /><br />

      {/* CARD */}
      <div style={styles.grid}>
        {filteredData.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.nama}</h3>
            <p>Email: {item.email}</p>
            <p>No HP: {item.no_hp}</p>

            <p><b>{item.posisi}</b></p>
            <p>{item.tempat_kerja}</p>
            <p>Status: {item.status}</p>

            <hr />

            <p>LinkedIn: {item.linkedin}</p>
            <p>IG: {item.instagram}</p>
            <p>FB: {item.facebook}</p>
            <p>TikTok: {item.tiktok}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
}

const styles = {
  statsContainer: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  cardStat: {
    flex: 1,
    minWidth: "120px",
    padding: "20px",
    background: "#667eea",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
  },
  filter: {
    padding: "10px",
    borderRadius: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
};