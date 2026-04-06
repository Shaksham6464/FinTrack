export const currency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

export function monthLabel(yyyy_mm) {
  const [y, m] = yyyy_mm.split("-");
  return new Date(+y, +m - 1).toLocaleString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

export function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return new Date(+y, +m - 1, +d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
