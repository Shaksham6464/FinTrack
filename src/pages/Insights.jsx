import React, { useMemo } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { currency, monthLabel } from "@/utils/formatters";
import { CAT_META } from "@/constants/categories";
import InsightCard from "@/components/ui/InsightCard";
import ChartCard from "@/components/ui/ChartCard";
import SavingsBarChart from "@/components/charts/SavingsBarChart";
import EmptyState from "@/components/ui/EmptyState";

export default function Insights() {
  const { transactions } = useAppContext();

  const data = useMemo(() => {
    if (!transactions.length) return null;

    const expenses = transactions.filter((t) => t.type === "expense");
    const income   = transactions.filter((t) => t.type === "income");

    // Highest spending category
    const catMap = {};
    expenses.forEach((t) => {
      catMap[t.category] = (catMap[t.category] || 0) + Math.abs(t.amount);
    });
    const [topCatName, topCatAmt] =
      Object.entries(catMap).sort((a, b) => b[1] - a[1])[0] || ["—", 0];

    // Monthly data
    const monthMap = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!monthMap[m]) monthMap[m] = { inc: 0, exp: 0 };
      if (t.type === "income") monthMap[m].inc += t.amount;
      else monthMap[m].exp += Math.abs(t.amount);
    });
    const months = Object.entries(monthMap).sort();
    const lastTwo = months.slice(-2);
    const momDelta =
      lastTwo.length === 2
        ? ((lastTwo[1][1].exp - lastTwo[0][1].exp) / lastTwo[0][1].exp) * 100
        : null;

    // Totals
    const totalInc = income.reduce((s, t) => s + t.amount, 0);
    const totalExp = expenses.reduce((s, t) => s + Math.abs(t.amount), 0);
    const savingsRate = totalInc > 0 ? ((totalInc - totalExp) / totalInc) * 100 : 0;

    // Largest transaction
    const biggest = [...transactions].sort(
      (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
    )[0];

    // Most frequent category
    const catCount = {};
    transactions.forEach((t) => {
      catCount[t.category] = (catCount[t.category] || 0) + 1;
    });
    const [freqCat, freqCount] =
      Object.entries(catCount).sort((a, b) => b[1] - a[1])[0] || ["—", 0];

    // Average daily spend
    const dates = expenses.map((t) => t.date).sort();
    const daySpan =
      dates.length >= 2
        ? Math.max(1, (new Date(dates[dates.length - 1]) - new Date(dates[0])) / 86400000)
        : 1;
    const avgDaily = totalExp / daySpan;

    // Best savings month
    const savingsByMonth = months.map(([m, v]) => ({
      month: monthLabel(m),
      savings: v.inc - v.exp,
    }));
    const bestMonth = [...savingsByMonth].sort((a, b) => b.savings - a.savings)[0];

    // Financial health score
    const health =
      savingsRate >= 20 ? "Excellent"
      : savingsRate >= 10 ? "Good"
      : savingsRate >= 0  ? "Fair"
      : "At Risk";

    const healthColor =
      savingsRate >= 20 ? "var(--green)"
      : savingsRate >= 0  ? "var(--gold)"
      : "var(--red)";

    return {
      topCatName, topCatAmt, momDelta, savingsRate,
      biggest, freqCat, freqCount, avgDaily, bestMonth,
      health, healthColor,
    };
  }, [transactions]);

  if (!data) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Insights</h1>
        </div>
        <EmptyState
          icon="🔍"
          title="No data yet"
          subtitle="Add some transactions to unlock insights"
        />
      </div>
    );
  }

  const {
    topCatName, topCatAmt, momDelta, savingsRate,
    biggest, freqCat, freqCount, avgDaily, bestMonth,
    health, healthColor,
  } = data;

  const insightCards = [
    {
      emoji:       "🔥",
      label:       "Highest Spending Category",
      value:       topCatName,
      description: `${currency(topCatAmt)} total · ${CAT_META[topCatName]?.icon || ""}`,
      valueColor:  CAT_META[topCatName]?.color,
    },
    {
      emoji:       momDelta !== null && momDelta > 0 ? "📈" : "📉",
      label:       "Month-over-Month Change",
      value:       momDelta !== null ? `${momDelta > 0 ? "+" : ""}${momDelta.toFixed(1)}%` : "N/A",
      description: momDelta !== null
        ? `Expenses ${momDelta > 0 ? "increased" : "decreased"} vs last month`
        : "Need 2+ months of data",
      valueColor:  momDelta > 0 ? "var(--red)" : "var(--green)",
    },
    {
      emoji:       "💹",
      label:       "Savings Rate",
      value:       `${savingsRate.toFixed(1)}%`,
      description: "Of total income retained",
      valueColor:
        savingsRate >= 20 ? "var(--green)"
        : savingsRate >= 0  ? "var(--gold)"
        : "var(--red)",
    },
    {
      emoji:       "🏆",
      label:       "Largest Transaction",
      value:       currency(Math.abs(biggest?.amount || 0)),
      description: biggest ? `${biggest.description} · ${biggest.date}` : "",
    },
    {
      emoji:       "☕",
      label:       "Avg Daily Spend",
      value:       currency(avgDaily),
      description: "Based on expense date range",
    },
    {
      emoji:       "📅",
      label:       "Best Savings Month",
      value:       bestMonth?.month || "—",
      description: bestMonth ? `Saved ${currency(bestMonth.savings)}` : "",
      valueColor:  "var(--green)",
    },
    {
      emoji:       "🛒",
      label:       "Most Active Category",
      value:       freqCat,
      description: `${freqCount} transactions`,
      valueColor:  CAT_META[freqCat]?.color,
    },
    {
      emoji:       "💡",
      label:       "Financial Health",
      value:       health,
      description:
        savingsRate >= 20 ? "Saving well above the 20% target"
        : savingsRate >= 0  ? "Aim to save at least 20% of income"
        : "Expenses are exceeding income",
      valueColor: healthColor,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">
          Smart observations derived from your transaction data
        </p>
      </div>

      <div className="insight-grid">
        {insightCards.map((card, i) => (
          <InsightCard key={i} {...card} />
        ))}
      </div>

      <ChartCard
        title="Monthly Savings Trend"
        subtitle="Net savings per month (income − expenses) — green = surplus, red = deficit"
      >
        <SavingsBarChart />
      </ChartCard>
    </div>
  );
}
