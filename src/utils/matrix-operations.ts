export const verticalFlip = (matrix: number[][]): number[][] =>
  deepCopy(matrix).reverse();

export const horizontalFlip = (matrix: number[][]): number[][] =>
  deepCopy(matrix).map((row) => row.reverse());

export const rotateClockwise = (matrix: number[][]): number[][] =>
  transpose(deepCopy(matrix).reverse());

export const rotateCounterClockwise = (matrix: number[][]): number[][] =>
  transpose(deepCopy(matrix)).reverse();

export const transpose = (matrix: number[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

export const deepCopy = <T>(target: T): T => JSON.parse(JSON.stringify(target));

export const emptyGrid = (rows = 5, cols = 5, fillWith = 0): number[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => fillWith),
  );

export const getCentoid = (matrix: number[][]): [number, number] => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  console.log(matrix);

  const rowSum = matrix.reduce(
    (acc, row) => acc + row.reduce((a, b) => a + (b !== -1 ? 1 : 0)),
    0,
  );
  const colSum = matrix.reduce(
    (acc, row) => acc + row.reduce((a, b) => a + (b !== -1 ? 1 : 0)),
    0,
  );

  return [rowSum / rows, colSum / cols];
};
