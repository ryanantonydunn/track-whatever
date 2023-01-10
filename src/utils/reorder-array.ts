export function reorderArray<T>(
  array: T[],
  oldIndex: number,
  newIndex: number
) {
  const copiedArray = [...array];
  if (
    oldIndex < 0 ||
    newIndex < 0 ||
    oldIndex >= array.length ||
    newIndex >= array.length ||
    oldIndex === newIndex
  ) {
    return array;
  }
  copiedArray.splice(newIndex, 0, copiedArray.splice(oldIndex, 1)[0]);
  return copiedArray;
}
