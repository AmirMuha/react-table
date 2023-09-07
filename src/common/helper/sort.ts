export default function sort<T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] {
  return array.slice().sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (order === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });
}
