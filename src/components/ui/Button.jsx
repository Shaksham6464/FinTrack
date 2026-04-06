import React from "react";

export function ButtonGold({ children, onClick, type = "button" }) {
  return (
    <button className="btn-gold" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonGhost({ children, onClick, type = "button", danger = false }) {
  return (
    <button
      className={`btn-ghost ${danger ? "danger" : ""}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
