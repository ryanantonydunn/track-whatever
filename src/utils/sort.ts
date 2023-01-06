export function arrayObjSort<T>(arr: T[], key: string): T[] {
  return arr.sort((b: any, a: any) => {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
  });
}
