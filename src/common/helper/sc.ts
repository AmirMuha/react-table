export default function sc(...classes: (string | undefined | null)[]): string {
  return classes ? classes.filter((s) => !!s).join(" ") : "";
}
