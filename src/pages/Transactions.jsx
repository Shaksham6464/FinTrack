import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import FilterBar from "@/components/transactions/FilterBar";
import TransactionTable from "@/components/transactions/TransactionTable";
import ExportMenu from "@/components/ui/ExportMenu";
import { ButtonGold } from "@/components/ui/Button";

export default function Transactions() {
  const { filtered, isAdmin, setModal } = useAppContext();

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">
              {filtered.length} record{filtered.length !== 1 ? "s" : ""} match current filters
            </p>
          </div>

          <div className="page-actions">
            <ExportMenu />
            {isAdmin && (
              <ButtonGold onClick={() => setModal({ mode: "add" })}>
                + New
              </ButtonGold>
            )}
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="viewer-notice">
          👁 <strong>Viewer Mode</strong> — you can browse and filter data but cannot
          add, edit or delete transactions. Switch to Admin to manage data.
        </div>
      )}

      <FilterBar />
      <TransactionTable />
    </div>
  );
}
