import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { CATEGORIES } from "@/data/seed";
import { monthLabel } from "@/utils/formatters";
import { ButtonGhost } from "@/components/ui/Button";

export default function FilterBar() {
  const { filters, setFilters, allMonths } = useAppContext();

  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const hasActiveFilters =
    filters.q ||
    filters.cat !== "All" ||
    filters.type !== "All" ||
    filters.month !== "All";

  const clearAll = () =>
    setFilters({ q: "", cat: "All", type: "All", month: "All" });

  return (
    <div className="filter-bar">
      <div className="filter-inputs">
        <input
          className="filter-input"
          placeholder="🔍  Search description or category…"
          value={filters.q}
          onChange={(e) => update("q", e.target.value)}
        />

        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-select"
          value={filters.cat}
          onChange={(e) => update("cat", e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filters.month}
          onChange={(e) => update("month", e.target.value)}
        >
          {allMonths.map((m) => (
            <option key={m} value={m}>
              {m === "All" ? "All Months" : monthLabel(m)}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <ButtonGhost onClick={clearAll}>✕ Clear filters</ButtonGhost>
      )}
    </div>
  );
}
