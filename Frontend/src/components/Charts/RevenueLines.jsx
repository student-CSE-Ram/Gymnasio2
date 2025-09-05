// components/charts/RevenueChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 9000 },
  { month: "Mar", revenue: 12000 },
  { month: "Apr", revenue: 12500 },
  { month: "May", revenue: 15000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-gradient-to-b from-fuchsia-50 via-fuchsia-100 to-fuchsia-200 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
