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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/earthquakes/`)
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
  }, []);

  const safeEarthquakes = Array.isArray(earthquakes) ? earthquakes : [];

  const filteredEarthquakes = safeEarthquakes.filter(
    (eq) => eq?.magnitude >= minMag
  );

  // ✅ LOADING UI
  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{
          height: "30px",
          width: "60%",
          background: "#eee",
          margin: "10px auto",
          borderRadius: "5px"
        }} />

        <div style={{
          height: "300px",
          background: "#eee",
          borderRadius: "10px",
          marginBottom: "20px"
        }} />

        <div style={{
          height: "200px",
          background: "#eee",
          borderRadius: "10px"
        }} />
      </div>
    );
  }

  // ✅ ERROR UI
  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  // ✅ EMPTY STATE
  if (!earthquakes || earthquakes.length === 0) {
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

      {/* 🌙 DARK MODE BUTTON */}
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
          zIndex: 2000
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* 📦 MAIN CONTENT */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "clamp(20px, 5vw, 30px)",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          🌍 LEE's Seismic Monitoring <br /> Dashboard
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

        {/* 🗺 MAP */}
        <div
          style={{
            background: darkMode ? "#1e1e1e" : "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginBottom: "15px",
          }}
        >
          <EarthquakeMap
            earthquakes={filteredEarthquakes}
            onSelect={setSelectedEq}
          />
        </div>

        {/* 📊 CHART */}
        <div
          style={{
            background: darkMode ? "#1e1e1e" : "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <EarthquakeChart
            earthquakes={filteredEarthquakes}
            selectedEq={selectedEq}
          />
        </div>
      </div>

      {/* 📌 SIDEBAR */}
      {selectedEq && (
        <div
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            width: window.innerWidth < 768 ? "100%" : "300px",
            height: "100%",
            background: "#fff",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
            padding: "20px",
            zIndex: 1000,
            overflowY: "auto",
            transition: "right 0.3s ease-in-out",
          }}
        >
          <h2>🌍 Earthquake Details</h2>

          <p>
            <strong>📍 Location:</strong><br />
            {selectedEq.place || `Lat: ${selectedEq.latitude}, Lng: ${selectedEq.longitude}`}
          </p>

          <p>
            <strong>📊 Magnitude:</strong><br />
            {selectedEq.magnitude}
          </p>

          <p>
            <strong>🕒 Time:</strong><br />
            {new Date(selectedEq.time).toLocaleString()}
          </p>

          <p>
            <strong>🌐 Coordinates:</strong><br />
            {selectedEq.latitude}, {selectedEq.longitude}
          </p>

          <button
            onClick={() => setSelectedEq(null)}
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;