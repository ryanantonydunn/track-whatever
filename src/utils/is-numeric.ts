export function isNumeric(n: string): boolean {
  return /^\d*\.?\d+$/.test(n);
}
