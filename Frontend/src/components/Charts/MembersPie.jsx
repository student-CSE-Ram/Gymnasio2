// components/charts/MembersPlanChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Basic", value: 300 },
  { name: "Standard", value: 450 },
  { name: "Premium", value: 200 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f97316"];

export default function MembersPlanChart() {
  return (
    <div className="bg-green-50 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Membership Plans</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
