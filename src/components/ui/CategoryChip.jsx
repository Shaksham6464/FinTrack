import React from "react";
import { CAT_META } from "@/constants/categories";

export default function CategoryChip({ category }) {
  const meta = CAT_META[category] || { color: "#94a3b8", icon: "📦" };

  return (
    <span
      className="cat-chip"
      style={{
        background: `${meta.color}18`,
        color: meta.color,
      }}
    >
      {meta.icon} {category}
    </span>
  );
}
