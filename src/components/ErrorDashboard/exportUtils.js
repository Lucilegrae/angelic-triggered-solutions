export const exportCSV = (errors) => {
  const headers = ["Message", "Severity", "Created At", "Stack", "Component Stack"];
  const rows = errors.map((err) => [
    `"${err.message}"`,
    err.severity || "medium",
    new Date(err.created_at).toLocaleString(),
    `"${err.stack || ""}"`,
    `"${err.component_stack || ""}"`
  ]);
  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "error_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportPNG = async () => {
  const html2canvas = (await import("html2canvas")).default;
  const target = document.querySelector("section");
  if (!target) return;
  const canvas = await html2canvas(target);
  const link = document.createElement("a");
  link.download = "error_dashboard.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};
