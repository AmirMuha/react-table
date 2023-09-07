export function alpha(color: string, opacity: number) {
  if (color.startsWith("#")) {
    color = color.slice(1);
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    return newColor;
  } else if (color.startsWith("rgb(")) {
    const rgbMatch = color.match(/(\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      return newColor;
    } else return color;
  } else return color;
}
