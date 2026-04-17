import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeChart from "./components/EarthquakeChart";
import BASE_URL from "./api";

function App() {
  const [minMag, setMinMag] = useState(0);
  const [earthquakes, setEarthquakes] = useState([]);

  const [loading, setLoading] = useState(true); // ✅ ADD
  const [error, setError] = useState(null); // ✅ ADD
  const [selectedEq, setSelectedEq] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/earthquakes/`)
      .then((response) => {
        console.log("FULL RESPONSE:", response.data);

        setEarthquakes(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || [],
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
    (eq) => eq?.magnitude >= minMag,
  );
  if (loading) return <p style={{ textAlign: "center" }}>Loading data...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  if (!earthquakes || earthquakes.length === 0) {
    return <p>No earthquake data available yet...</p>;
  }
  console.log("LOADING:", loading);
  console.log("ERROR:", error);
  console.log("DATA:", earthquakes);

  return (
    <>
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
          🌍 Seismic Monitoring <br /> Dashboard
        </h1>

        {/* FILTER */}
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

        {/* MAP */}
        <div
          style={{
            background: "white",
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

        {/* CHART */}
        <div
          style={{
            background: "white",
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

      {/* SIDEBAR */}
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
          }}
        >
          <h2>🌍 Earthquake Details</h2>

          <p>
            <strong>📍 Location:</strong>
            <br />
            {selectedEq.place
              ? selectedEq.place
              : `Lat: ${selectedEq.latitude}, Lng: ${selectedEq.longitude}`}
          </p>
          <p>
            <strong>📊 Magnitude:</strong>
            <br /> {selectedEq.magnitude}
          </p>
          <p>
            <strong>🕒 Time:</strong>
            <br /> {new Date(selectedEq.time).toLocaleString()}
          </p>
          <p>
            <strong>🌐 Coordinates:</strong>
            <br /> {selectedEq.latitude}, {selectedEq.longitude}
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
    </>
  );
}

export default App;
