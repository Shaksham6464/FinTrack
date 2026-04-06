import React, { useState, useEffect } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { CATEGORIES } from "@/data/seed";
import Modal from "@/components/ui/Modal";
import { ButtonGold, ButtonGhost } from "@/components/ui/Button";

const BLANK = {
  date: new Date().toISOString().slice(0, 10),
  description: "",
  category: "Food",
  amount: "",
  type: "expense",
};

export default function TransactionModal() {
  const { modal, setModal, addTransaction, updateTransaction, isAdmin } = useAppContext();
  const [form, setForm] = useState(BLANK);
  const [error, setError] = useState("");

  useEffect(() => {
    if (modal?.tx) {
      setForm({ ...modal.tx, amount: Math.abs(modal.tx.amount) });
    } else {
      setForm(BLANK);
    }
    setError("");
  }, [modal]);

  if (!modal || !isAdmin) return null;

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || +form.amount <= 0) return setError("Enter a valid amount.");

    const amount =
      form.type === "expense"
        ? -Math.abs(+form.amount)
        : +Math.abs(+form.amount);

    const tx = { ...form, amount };

    if (modal.mode === "add") addTransaction(tx);
    else updateTransaction({ ...tx, id: modal.tx.id });

    setModal(null);
  };

  const footer = (
    <>
      <ButtonGhost onClick={() => setModal(null)}>Cancel</ButtonGhost>
      <ButtonGold onClick={handleSave}>
        {modal.mode === "add" ? "+ Add" : "Save Changes"}
      </ButtonGold>
    </>
  );

  return (
    <Modal
      title={modal.mode === "add" ? "New Transaction" : "Edit Transaction"}
      onClose={() => setModal(null)}
      footer={footer}
    >
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            className="form-input"
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          className="form-input"
          placeholder="e.g. Monthly Salary, Grocery Run…"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Amount (USD)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
          />
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}
    </Modal>
  );
}
