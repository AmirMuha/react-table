export function separateDigits(number: number | string, delimiter: string = ","): string {
  const num = number ?? 0;
  const extractedNumber = typeof num === "string" ? +num.replace(/\D/g, "") : num;
  const numberStr = extractedNumber.toLocaleString("en-US");
  return numberStr.replace(/\D/g, delimiter);
}
