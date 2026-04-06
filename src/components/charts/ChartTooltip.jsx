import React from "react";
import { currency } from "@/utils/formatters";

export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((entry, i) => (
        <div
          key={i}
          className="chart-tooltip-row"
          style={{ color: entry.color }}
        >
          {entry.name}:{" "}
          <strong style={{ fontFamily: "'DM Mono', monospace" }}>
            {currency(entry.value, true)}
          </strong>
        </div>
      ))}
    </div>
  );
}
