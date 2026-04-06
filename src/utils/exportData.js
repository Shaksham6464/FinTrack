export function exportAsCSV(transactions) {
  const header = "id,date,description,category,amount,type";
  const rows = transactions.map(
    (t) => `${t.id},"${t.date}","${t.description}",${t.category},${t.amount},${t.type}`
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
  triggerDownload(blob, "transactions.csv");
}

export function exportAsJSON(transactions) {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: "application/json",
  });
  triggerDownload(blob, "transactions.json");
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
