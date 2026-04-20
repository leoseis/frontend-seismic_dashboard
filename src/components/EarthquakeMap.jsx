import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Legend from "./Legend";

function getColor(mag) {
  if (mag < 3) return "green";
  if (mag < 5) return "yellow";
  if (mag < 7) return "orange";
  return "red";
}

function EarthquakeMap({ earthquakes, onSelect }) {
  const locationCache = {}; // ✅ simple in-memory cache
  const API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

  // ✅ Handle marker click + fetch location
  const handleClick = async (eq) => {
    const key = `${eq.latitude},${eq.longitude}`;

    

  // ✅ 1. Check cache first
  if (locationCache[key]) {
    onSelect({
      ...eq,
      place: locationCache[key],
    });
    return;
  }
    try {
      const res = await fetch(
  `https://api.opencagedata.com/geocode/v1/json?q=${eq.longitude}+${eq.latitude}&key=${API_KEY}`
);

      const data = await res.json();

      const location =
        data.results?.[0]?.formatted || "Unknown location";

      onSelect({
        ...eq,
        place: location,
      });
    } catch (err) {
      console.error(err);

      onSelect({
        ...eq,
        place: "Unknown location",
      });
    }
  };

  // ✅ MAIN RETURN (this was missing in your code)
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <Legend />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {earthquakes.map((eq) => {
        const lat = Number(eq.latitude);
        const lng = Number(eq.longitude);
        const mag = Number(eq.magnitude);

        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <CircleMarker
            key={eq.id}
            center={[lat, lng]}
            radius={8}
            eventHandlers={{
              click: () => handleClick(eq),
            }}
            pathOptions={{
              color: getColor(mag),
            }}
          >
            <Popup>
              <div style={{ minWidth: "150px" }}>
                <strong>📍 Location:</strong>
                <br />
                {eq.place || "Unknown"}
                <br />
                <br />

                <strong>📊 Magnitude:</strong>
                <br />
                {eq.magnitude}
                <br />
                <br />

                <strong>🕒 Time:</strong>
                <br />
                {new Date(eq.time).toLocaleString()}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default EarthquakeMap;