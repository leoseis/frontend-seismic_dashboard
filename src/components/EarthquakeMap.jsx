import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Legend from "./Legend";


function getColor(mag) {
  if (mag < 3) return "green";
  if (mag < 5) return "yellow";
  if (mag < 7) return "orange";
  return "red";
}

function EarthquakeMap({ earthquakes }) {



  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
      scrollWheelZoom={true}
    >
     <Legend />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

   {earthquakes.map((eq) => {

  const lat = Number(eq.latitude);
  const lng = Number(eq.longitude);
  const mag = Number(eq.magnitude);

  if (isNaN(lat) || isNaN(lng)) return null;

  const color = getColor(mag);

  return (
    <CircleMarker
      key={eq.id}
      center={[lat, lng]}
      radius={Math.max(mag * 4, 5)}
      color={color}
      fillColor={color}
      fillOpacity={0.7}
    >
      <Popup>
        <strong>{eq.location}</strong><br />
        Magnitude: {mag}<br />
        Depth: {eq.depth} km<br />
        Time: {eq.time}
      </Popup>
    </CircleMarker>
  );
})}

    </MapContainer>
    
    
  );
}

export default EarthquakeMap;