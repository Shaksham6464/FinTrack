import React, { useMemo } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { currency } from "@/utils/formatters";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import CashFlowChart from "@/components/charts/CashFlowChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import ExpenseBarChart from "@/components/charts/ExpenseBarChart";

export default function Overview() {
  const { transactions } = useAppContext();

  const stats = useMemo(() => {
    const income   = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const net      = income + expenses;
    const savings  = income > 0 ? (net / income) * 100 : 0;
    return {
      income,
      expenses: Math.abs(expenses),
      net,
      savings,
      incomeCount:  transactions.filter((t) => t.type === "income").length,
      expenseCount: transactions.filter((t) => t.type === "expense").length,
    };
  }, [transactions]);

  const statCards = [
    {
      label:       "Total Income",
      value:       currency(stats.income, true),
      sub:         `${stats.incomeCount} payments`,
      icon:        "💰",
      accentColor: "#34d399",
      valueClass:  "positive",
    },
    {
      label:       "Total Expenses",
      value:       currency(stats.expenses, true),
      sub:         `${stats.expenseCount} charges`,
      icon:        "💸",
      accentColor: "#f87171",
      valueClass:  "negative",
    },
    {
      label:       "Net Balance",
      value:       currency(Math.abs(stats.net), true),
      sub:         stats.net >= 0 ? "You're in the green" : "Running a deficit",
      icon:        "📊",
      accentColor: stats.net >= 0 ? "#34d399" : "#f87171",
      valueClass:  stats.net >= 0 ? "positive" : "negative",
    },
    {
      label:       "Savings Rate",
      value:       `${stats.savings.toFixed(1)}%`,
      sub:         "Of total income retained",
      icon:        "📈",
      accentColor: "#c9a84c",
      valueClass:  "gold",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
        <p className="page-subtitle">
          Your complete financial picture · {transactions.length} transactions recorded
        </p>
      </div>

      <div className="stat-grid">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="chart-grid">
        <ChartCard title="Monthly Cash Flow" subtitle="Income vs. expenses over time">
          <CashFlowChart />
        </ChartCard>

        <ChartCard title="Spending Breakdown" subtitle="By category">
          <CategoryPieChart />
        </ChartCard>

        <ChartCard title="Monthly Expense Trend" subtitle="Total expenses per month" className="full">
          <ExpenseBarChart />
        </ChartCard>
      </div>
    </div>
  );
}
