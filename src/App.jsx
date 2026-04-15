import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";

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
  const filteredEarthquakes = earthquakes.filter(
  (eq) => eq.magnitude >= minMag
);
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
  <label>Minimum Magnitude: </label>

<input
  type="range"
  min="0"
  max="8"
  step="0.1"
  value={minMag}
  onChange={(e) => setMinMag(Number(e.target.value))}
/>
  <span> {minMag}</span>
</div>



      <h1>Global Earthquake Monitor</h1>

      <EarthquakeMap earthquakes={filteredEarthquakes} />

    </div>
  );
}

export default App;