import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/hooks/useAppContext";
import { monthLabel } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

export default function ExpenseBarChart() {
  const { transactions } = useAppContext();

  const data = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { month: monthLabel(m), expenses: 0 };
      if (t.type === "expense") map[m].expenses += Math.abs(t.amount);
    });
    return Object.values(map).sort((a, b) => (a.month > b.month ? 1 : -1));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip content={<ChartTooltip />} />
        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="var(--gold)"
          radius={[5, 5, 0, 0]}
          maxBarSize={52}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
