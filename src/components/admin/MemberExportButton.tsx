"use client";

import { useState } from "react";
import { Button } from "@payloadcms/ui";

export const MemberExportButton = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setError(null);
    setIsExporting(true);

    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    try {
      const response = await fetch(`/api/member/export?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        setError(
          response.status === 401
            ? "You are not authorized to export member data."
            : "Failed to export member data.",
        );
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "members-export.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Failed to export member data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        marginBottom: "1rem",
        flexWrap: "wrap",
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Payment date from
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Payment date to
        <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
      </label>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? "Exporting..." : "Export CSV"}
      </Button>
      {error && <span style={{ color: "var(--theme-error-500, red)" }}>{error}</span>}
    </div>
  );
};
