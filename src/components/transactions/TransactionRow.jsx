import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { currency } from "@/utils/formatters";
import CategoryChip from "@/components/ui/CategoryChip";
import TypeChip from "@/components/ui/TypeChip";

export default function TransactionRow({ transaction }) {
  const { isAdmin, setModal, deleteTransaction } = useAppContext();
  const t = transaction;

  const handleDelete = () => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(t.id);
    }
  };

  return (
    <tr>
      <td>
        <span className="td-date">{t.date}</span>
      </td>
      <td>
        <span className="td-description">{t.description}</span>
      </td>
      <td>
        <CategoryChip category={t.category} />
      </td>
      <td>
        <TypeChip type={t.type} />
      </td>
      <td className="td-amount-cell">
        <span className={`td-amount ${t.amount >= 0 ? "positive" : "negative"}`}>
          {t.amount >= 0 ? "+" : "−"}
          {currency(Math.abs(t.amount))}
        </span>
      </td>
      {isAdmin && (
        <td>
          <div className="row-actions">
            <button
              className="action-btn"
              onClick={() => setModal({ mode: "edit", tx: t })}
            >
              Edit
            </button>
            <button className="action-btn danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
