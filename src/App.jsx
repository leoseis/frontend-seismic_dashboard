import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeChart from "./components/EarthquakeChart";
import BASE_URL from "./api";

function App() {
  const [minMag, setMinMag] = useState(0);
  const [earthquakes, setEarthquakes] = useState([]);

  const [loading, setLoading] = useState(true);   // ✅ ADD
  const [error, setError] = useState(null);       // ✅ ADD

  useEffect(() => {
  axios
    .get(`${BASE_URL}/api/earthquakes/`)
    .then((response) => {
      console.log("FULL RESPONSE:", response.data);

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

  console.log("EARTHQUAKES:", earthquakes);

  // ✅ ONLY filtering logic here
  const safeEarthquakes = Array.isArray(earthquakes) ? earthquakes : [];

const filteredEarthquakes = safeEarthquakes.filter(
  (eq) => eq?.magnitude >= minMag
);
if (loading) return <p style={{ textAlign: "center" }}>Loading data...</p>;
if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

if (!earthquakes || earthquakes.length === 0) {
  return <p>No earthquake data available yet...</p>;
}
console.log("LOADING:", loading);
console.log("ERROR:", error);
console.log("DATA:", earthquakes);

  return (
    <div style={{
      maxWidth: "100%",
      width: "100%",
      padding: "10px",
    }}>

      <h1 style={{
        textAlign: "center",
        marginBottom: "20px"
      }}>
        🌍 Seismic Monitoring Dashboard
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

      {/* 📦 MAP CARD */}
      <div style={{
        background: "white",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "15px"
      }}>
        <EarthquakeMap earthquakes={filteredEarthquakes} />
      </div>

      {/* 📊 CHART CARD */}
      <div style={{
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <EarthquakeChart earthquakes={filteredEarthquakes} />
      </div>

    </div>
  );
}

export default App;