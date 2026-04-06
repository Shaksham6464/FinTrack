import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { ButtonGhost } from "./Button";

export default function ExportMenu() {
  const { exportData } = useAppContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleExport = (format) => {
    exportData(format);
    setOpen(false);
  };

  return (
    <div className="export-wrap" ref={ref}>
      <ButtonGhost onClick={() => setOpen((v) => !v)}>↓ Export</ButtonGhost>
      {open && (
        <div className="export-menu">
          <button className="export-item" onClick={() => handleExport("csv")}>
            📄 CSV
          </button>
          <button className="export-item" onClick={() => handleExport("json")}>
            📋 JSON
          </button>
        </div>
      )}
    </div>
  );
}
