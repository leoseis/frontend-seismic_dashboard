
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function EarthquakeChart({ earthquakes }) {

  // Prepare data
  const chartData = [
  { range: "<3", count: earthquakes.filter(eq => eq.magnitude < 3).length },
  { range: "3-5", count: earthquakes.filter(eq => eq.magnitude >= 3 && eq.magnitude < 5).length },
  { range: "5-7", count: earthquakes.filter(eq => eq.magnitude >= 5 && eq.magnitude < 7).length },
  { range: "7+", count: earthquakes.filter(eq => eq.magnitude >= 7).length },
];

  return (
    <div style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#4CAF50" />
    </BarChart>
  </ResponsiveContainer>
</div>
  );
}

export default EarthquakeChart;
