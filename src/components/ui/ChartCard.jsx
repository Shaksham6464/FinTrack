import React from "react";

export default function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card-title">{title}</div>
      {subtitle && <div className="chart-card-sub">{subtitle}</div>}
      {children}
    </div>
  );
}
