import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Cell } from "recharts";

function EarthquakeChart({ earthquakes, selectedEq }) {
  // Prepare data
  const chartData = [
    { range: "<3", count: earthquakes.filter((eq) => eq.magnitude < 3).length },
    {
      range: "3-5",
      count: earthquakes.filter((eq) => eq.magnitude >= 3 && eq.magnitude < 5)
        .length,
    },
    {
      range: "5-7",
      count: earthquakes.filter((eq) => eq.magnitude >= 5 && eq.magnitude < 7)
        .length,
    },
    {
      range: "7+",
      count: earthquakes.filter((eq) => eq.magnitude >= 7).length,
    },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {chartData.map((entry, index) => {
              const mag = selectedEq?.magnitude;

              const isSelected =
                mag !== undefined &&
                ((mag < 3 && entry.range === "<3") ||
                  (mag >= 3 && mag < 5 && entry.range === "3-5") ||
                  (mag >= 5 && mag < 7 && entry.range === "5-7") ||
                  (mag >= 7 && entry.range === "7+"));

              return (
                <Cell key={index} fill={isSelected ? "#FF5722" : "#4CAF50"} />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarthquakeChart;
