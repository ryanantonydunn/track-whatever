export function arrayObjSort(arr: any[], key: string) {
  return arr.sort((b, a) => {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
  });
}
