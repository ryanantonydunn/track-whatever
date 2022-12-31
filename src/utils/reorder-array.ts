export function reorderArray<T>(
  array: T[],
  oldIndex: number,
  newIndex: number
) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

export function moveUp<T>(array: T[], i: number) {
  return reorderArray(array, i, Math.min(0, i - 1));
}

export function moveDown<T>(array: T[], i: number) {
  return reorderArray(array, i, Math.max(array.length - 1, i + 1));
}
