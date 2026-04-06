import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { NAV_ITEMS } from "@/constants/nav";

export default function Sidebar() {
  const { page, setPage, isAdmin } = useAppContext();

  return (
    <nav className="sidebar">
      <div className="nav-section">Navigation</div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-btn ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}

      <hr className="nav-divider" />

      <div className="nav-section">Role</div>
      <div className="nav-role-hint">
        {isAdmin
          ? "Full access — view, add, edit and delete transactions."
          : "Read-only — browsing and filtering only. Switch to Admin to manage data."}
      </div>
    </nav>
  );
}
