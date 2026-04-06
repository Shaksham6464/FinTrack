import React, { createContext, useState, useMemo, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SEED_TRANSACTIONS } from "@/data/seed";
import { exportAsCSV, exportAsJSON } from "@/utils/exportData";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage("ft_txns", SEED_TRANSACTIONS);
  const [role,         setRole]         = useLocalStorage("ft_role", "admin");
  const [dark,         setDark]         = useLocalStorage("ft_dark", true);
  const [filters,      setFilters]      = useState({ q: "", cat: "All", type: "All", month: "All" });
  const [modal,        setModal]        = useState(null);
  const [toast,        setToast]        = useState(null);
  const [page,         setPage]         = useState("overview");

  const notify = useCallback((msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
    notify("Transaction added successfully");
  }, [setTransactions, notify]);

  const updateTransaction = useCallback((tx) => {
    setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
    notify("Transaction updated");
  }, [setTransactions, notify]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    notify("Transaction deleted", false);
  }, [setTransactions, notify]);

  const exportData = useCallback((format) => {
    if (format === "csv") exportAsCSV(transactions);
    else exportAsJSON(transactions);
    notify(`Exported as ${format.toUpperCase()}`);
  }, [transactions, notify]);

  const allMonths = useMemo(() => {
    const set = new Set(transactions.map((t) => t.date.slice(0, 7)));
    return ["All", ...Array.from(set).sort().reverse()];
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchQ =
        !filters.q ||
        t.description.toLowerCase().includes(filters.q.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.q.toLowerCase());
      const matchCat  = filters.cat   === "All" || t.category === filters.cat;
      const matchType = filters.type  === "All" || t.type     === filters.type;
      const matchMonth= filters.month === "All" || t.date.startsWith(filters.month);
      return matchQ && matchCat && matchType && matchMonth;
    });
  }, [transactions, filters]);

  const value = {
    transactions,
    filtered,
    role,
    setRole,
    dark,
    setDark,
    filters,
    setFilters,
    modal,
    setModal,
    toast,
    allMonths,
    page,
    setPage,
    isAdmin: role === "admin",
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
