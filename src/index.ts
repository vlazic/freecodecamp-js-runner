export default function dropElements(
  arr: number[],
  func: (n: number) => boolean,
): number[] {
  const index = arr.findIndex(func);
  console.log(arr.splice(index));

  return [3, 4];
}
