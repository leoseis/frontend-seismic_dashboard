import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

// 🎨 Color based on magnitude
function getColor(mag) {
  if (mag < 3) return "green";
  if (mag < 5) return "yellow";
  if (mag < 7) return "orange";
  return "red";
}

function EarthquakeMap({ earthquakes, onSelect }) {
  // ✅ SIMPLE click handler (backend already gives location)
  const handleClick = (eq) => {
    console.log("Clicked EQ:", eq); // debug
    onSelect(eq);
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "300px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {earthquakes.map((eq, index) => (
        <CircleMarker
          key={index}
          center={[eq.latitude, eq.longitude]}
          radius={6}
          pathOptions={{
            color: getColor(eq.magnitude),
            fillOpacity: 0.7,
          }}
          eventHandlers={{
            click: () => handleClick(eq), // ✅ clean
          }}
        >
          <Popup>
            <div>
              <strong>📍 Location:</strong>
              <br />
              {eq.location || "Loading..."}
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
      ))}
    </MapContainer>
  );
}

export default EarthquakeMap;
