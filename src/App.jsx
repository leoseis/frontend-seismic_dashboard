import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeChart from "./components/EarthquakeChart";

function App() {
  const [minMag, setMinMag] = useState(0);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/earthquakes/")
      .then((response) => {
        setEarthquakes(response.data);
      });
  }, []);

  console.log("EARTHQUAKES:", earthquakes);

  // ✅ ONLY filtering logic here
  const filteredEarthquakes = earthquakes.filter(
    (eq) => eq.magnitude >= minMag
  );

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px"
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
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "20px"
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