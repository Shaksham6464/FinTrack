import React from "react";

export default function TypeChip({ type }) {
  return (
    <span className={`type-chip ${type}`}>
      {type}
    </span>
  );
}
