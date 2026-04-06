import React from "react";

export default function StatCard({ label, value, sub, icon, accentColor, valueClass }) {
  return (
    <div className="stat-card" style={{ "--accent-line": accentColor }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${valueClass || ""}`}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
  