import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import TransactionRow from "./TransactionRow";
import EmptyState from "@/components/ui/EmptyState";

export default function TransactionTable() {
  const { filtered, isAdmin } = useAppContext();

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon="📂"
        title="No transactions found"
        subtitle="Try adjusting your filters or add a new transaction"
      />
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th style={{ textAlign: "right" }}>Amount</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
