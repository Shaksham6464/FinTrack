import React from "react";

export default function IconButton({ children, onClick, title }) {
  return (
    <button className="icon-btn" onClick={onClick} title={title}>
      {children}
    </button>
  );
}
