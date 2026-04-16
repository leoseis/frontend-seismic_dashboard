import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function EarthquakeChart({ earthquakes }) {

  // Prepare data
  const data = [
    { range: "0-2", count: earthquakes.filter(e => e.magnitude < 2).length },
    { range: "2-4", count: earthquakes.filter(e => e.magnitude >= 2 && e.magnitude < 4).length },
    { range: "4-6", count: earthquakes.filter(e => e.magnitude >= 4 && e.magnitude < 6).length },
    { range: "6+", count: earthquakes.filter(e => e.magnitude >= 6).length },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}> {/* ✅ VERY IMPORTANT */}
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarthquakeChart;
