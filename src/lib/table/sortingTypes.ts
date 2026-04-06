export interface BaseRowData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ColumnSort {
  key: string;
  direction: "asc" | "desc";
}

export type CustomSortFn<T> = (a: T, b: T, direction: "asc" | "desc") => number;
