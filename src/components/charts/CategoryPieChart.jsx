import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/hooks/useAppContext";
import { CAT_META } from "@/constants/categories";
import { currency } from "@/utils/formatters";

export default function CategoryPieChart() {
  const { transactions } = useAppContext();

  const data = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      
      <PieChart>
        <defs>
  {data.map((entry, i) => (
    <linearGradient id={`grad-${i}`} key={i}>
      <stop offset="0%" stopColor={CAT_META[entry.name]?.color} />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>
  ))}
</defs>
        <Pie
          data={data}
          cx="50%"
          cy="44%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
           isAnimationActive={true}
  animationDuration={800}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={`url(#grad-${i})`} />
          ))}
        </Pie>
       <Tooltip
  formatter={(v) => currency(v)}
  contentStyle={{
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    border: "1px solid #334155",
    borderRadius: 10,
    backdropFilter: "blur(6px)",
    color: "#e2e8f0",
    fontSize: 12,
  }}
  itemStyle={{ color: "#e2e8f0" }}
  labelStyle={{ color: "#94a3b8" }}
/>
        <Legend
          iconType="circle"
          iconSize={7}
          formatter={(v) => (
            <span style={{ color: "var(--muted-2)", fontSize: 11 }}>{v}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
