import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeChart from "./components/EarthquakeChart";
import BASE_URL from "./api";

function App() {
  const [minMag, setMinMag] = useState(0);
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEq, setSelectedEq] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 🔄 Fetch + Auto-refresh
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${BASE_URL}/api/live-earthquakes/`)
        .then((response) => {
          setEarthquakes(
            Array.isArray(response.data)
              ? response.data
              : response.data.results || []
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to load data");
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredEarthquakes = (earthquakes || []).filter(
    (eq) => eq?.magnitude >= minMag
  );

  // ⏳ Loading
  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ height: "30px", width: "60%", background: "#eee", margin: "10px auto" }} />
        <div style={{ height: "300px", background: "#eee", marginBottom: "20px" }} />
        <div style={{ height: "200px", background: "#eee" }} />
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  // 📭 Empty
  if (!earthquakes.length) {
    return <p style={{ textAlign: "center" }}>No earthquake data available yet...</p>;
  }

  return (
    <div
      style={{
        background: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      {/* 🌙 DARK MODE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          background: darkMode ? "#333" : "#ddd",
          zIndex: 2000,
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* 📦 MAIN */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "10px" }}>
        
        {/* 🧭 TITLE */}
        <h1 style={{ textAlign: "center" }}>
          🌍 LEE's Seismic Monitoring Dashboard
        </h1>

        {/* 🎛 FILTER */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <label>Minimum Magnitude: {minMag}</label>
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
          />
        </div>

        {/* 🔴 LIVE */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <span style={{
            background: "red",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            marginRight: "10px",
          }}>
            ● LIVE
          </span>

          <span style={{ fontSize: "12px", color: darkMode ? "#aaa" : "#666" }}>
            Updating every 60 seconds
          </span>
        </div>

        {/* 🗺 MAP */}
        <div style={{
          background: darkMode ? "#1e1e1e" : "#fff",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}>
          <EarthquakeMap
            earthquakes={filteredEarthquakes}
            onSelect={setSelectedEq}
          />
        </div>

        {/* 📊 CHART */}
        <div style={{
          background: darkMode ? "#1e1e1e" : "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}>
          <EarthquakeChart
            earthquakes={filteredEarthquakes}
            selectedEq={selectedEq}
          />
        </div>
      </div>

      {/* 📌 SIDEBAR */}
      {selectedEq && (
        <div style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: window.innerWidth < 768 ? "100%" : "300px",
          height: "100%",
          background: "#fff",
          padding: "20px",
          zIndex: 1000,
        }}>
          <h2>🌍 Earthquake Details</h2>

          <p><strong>📍 Location:</strong><br />
            {selectedEq.place || "Unknown"}
          </p>

          <p><strong>📊 Magnitude:</strong><br />
            {selectedEq.magnitude}
          </p>

          <p><strong>🕒 Time:</strong><br />
            {new Date(selectedEq.time).toLocaleString()}
          </p>

          <button onClick={() => setSelectedEq(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;