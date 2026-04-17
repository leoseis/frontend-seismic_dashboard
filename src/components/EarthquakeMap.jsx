import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Legend from "./Legend";

const isMobile = window.innerWidth <= 768;
function getColor(mag) {
  if (mag < 3) return "green";
  if (mag < 5) return "yellow";
  if (mag < 7) return "orange";
  return "red";
}

function EarthquakeMap({ earthquakes, onSelect }) {
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

        const color = getColor(mag);
        if (!earthquakes || earthquakes.length === 0) {
          return <p>No data</p>;
        }

        return (
          <CircleMarker
            key={eq.id}
            center={[eq.latitude, eq.longitude]}
            radius={8}
            eventHandlers={{
    click: () => onSelect(eq)
  }}
            pathOptions={{
              color:
                eq.magnitude < 3
                  ? "green"
                  : eq.magnitude < 5
                    ? "yellow"
                    : eq.magnitude < 7
                      ? "orange"
                      : "red",
            }}
          >
            <Popup>
              <div style={{ minWidth: "150px" }}>
                <strong>📍 Location:</strong>
                <br />
                {eq.place || "Unknown"} <br />
                <br />
                <strong>📊 Magnitude:</strong>
                <br />
                {eq.magnitude} <br />
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
