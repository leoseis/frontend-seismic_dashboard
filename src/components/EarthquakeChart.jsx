import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function EarthquakeChart({ earthquakes }) {

  // Group by magnitude ranges
  const data = [
    {
      name: "<3",
      count: earthquakes.filter(e => e.magnitude < 3).length
    },
    {
      name: "3-5",
      count: earthquakes.filter(e => e.magnitude >= 3 && e.magnitude < 5).length
    },
    {
      name: "5-7",
      count: earthquakes.filter(e => e.magnitude >= 5 && e.magnitude < 7).length
    },
    {
      name: "7+",
      count: earthquakes.filter(e => e.magnitude >= 7).length
    }
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Earthquake Distribution</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarthquakeChart;