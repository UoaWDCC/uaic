"use client";

import { Button, useConfig, useForm } from "@payloadcms/ui";

export const ExportDownloadButton = () => {
  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig();
  const { getData } = useForm();

  const handleDownload = async () => {
    try {
      const data = getData();
      const response = await fetch(`${serverURL}${api}/exports/download`, {
        body: JSON.stringify({ data }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.name}.${data.format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Button onClick={handleDownload} size="medium" type="button">
      Download
    </Button>
  );
};
