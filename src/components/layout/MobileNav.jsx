import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { NAV_ITEMS } from "@/constants/nav";

export default function MobileNav() {
  const { page, setPage } = useAppContext();

  return (
    <div className="mobile-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-btn ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
