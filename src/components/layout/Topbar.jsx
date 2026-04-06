import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import IconButton from "@/components/ui/IconButton";

export default function Topbar() {
  const { role, setRole, dark, setDark, isAdmin } = useAppContext();

  return (
    <header className="topbar">
      <div className="wordmark">
        <div className="wordmark-badge">F</div>
        <span className="wordmark-text">
          Fin<em>Track</em>
        </span>
      </div>

      <div className="topbar-right">
        <span className={`rbac-tag ${isAdmin ? "admin" : "viewer"}`}>
          {isAdmin ? "👑 Admin" : "👁 Viewer"}
        </span>

        <select
          className="role-pill"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <IconButton onClick={() => setDark((d) => !d)} title="Toggle theme">
          {dark ? "☀" : "🌙"}
        </IconButton>
      </div>
    </header>
  );
}
