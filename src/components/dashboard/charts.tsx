"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PIE_COLORS = ["#00C896", "#22C55E", "#EF4444", "#FBBF24", "#14B8A6"];

interface BarChartProps {
  data: { day: string; tasks: number }[];
}

export function ActivityBarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="day" fontSize={12} stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)" }} />
        <YAxis fontSize={12} allowDecimals={false} stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)" }} />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "#1a1a1a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            color: "rgba(255,255,255,0.8)",
          }}
        />
        <Bar dataKey="tasks" fill="#00C896" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PieChartProps {
  data: { name: string; value: number }[];
}

export function TaskPieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "#1a1a1a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            color: "rgba(255,255,255,0.8)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
