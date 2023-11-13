export default function sort<T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc", cb?: (a: T, b: T) => boolean): T[] {
  return array.slice().sort((a, b) => {
    if (cb) {
      if (order === "asc") return !!cb(a, b) ? 1 : -1;
      else return !!cb(a, b) ? -1 : 1;
    } else {
      const aValue = a[key];
      const bValue = b[key];
      if (order === "asc") {
        if (!cb && aValue < bValue) return -1;
        if (!cb && aValue > bValue) return 1;
        return 0;
      } else {
        if (!cb && aValue > bValue) return -1;
        if (!cb && aValue < bValue) return 1;
        return 0;
      }
    }
  });
}
