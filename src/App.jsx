import { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";

function App() {

  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/earthquakes/")
      .then((response) => {
        setEarthquakes(response.data);
      });

  }, []);
  console.log("EARTHQUAKES:", earthquakes);
  return (
    <div>

      <h1>Global Earthquake Monitor</h1>

      <EarthquakeMap earthquakes={earthquakes} />

    </div>
  );
}

export default App;