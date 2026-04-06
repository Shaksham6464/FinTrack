import React from "react";

export default function InsightCard({ emoji, label, value, description, valueColor }) {
  return (
    <div className="insight-card">
      <div className="insight-emoji">{emoji}</div>
      <div className="insight-body">
        <div className="insight-label">{label}</div>
        <div
          className="insight-value"
          style={valueColor ? { color: valueColor } : {}}
        >
          {value}
        </div>
        {description && <div className="insight-desc">{description}</div>}
      </div>
    </div>
  );
}
