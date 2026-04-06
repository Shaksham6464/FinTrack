import React, { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/hooks/useAppContext";
import { monthLabel } from "@/utils/formatters";
import ChartTooltip from "./ChartTooltip";

export default function CashFlowChart() {
  const { transactions } = useAppContext();

  const data = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { month: monthLabel(m), income: 0, expenses: 0 };
      if (t.type === "income") map[m].income += t.amount;
      else map[m].expenses += Math.abs(t.amount);
    });
    return Object.values(map).sort((a, b) => (a.month > b.month ? 1 : -1));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
        <defs>
          <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#34d399" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f87171" stopOpacity={0.22} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" />
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
        <Legend iconType="circle" iconSize={7} />
        <Area
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#34d399"
          strokeWidth={2}
          fill="url(#gradIncome)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="Expenses"
          stroke="#f87171"
          strokeWidth={2}
          fill="url(#gradExpenses)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
