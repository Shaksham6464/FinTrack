import React from "react";
import { useAppContext } from "@/hooks/useAppContext";

export default function Toast() {
  const { toast } = useAppContext();

  if (!toast) return null;

  const isSuccess = toast.ok !== false;

  return (
    <div className={`toast ${isSuccess ? "success" : "error"}`}>
      <span>{isSuccess ? "✓" : "✕"}</span>
      {toast.msg}
    </div>
  );
}
