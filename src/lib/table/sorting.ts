import { ColumnSort, CustomSortFn, BaseRowData } from "./sortingTypes";

/**
 * Sorting utilities for generic data tables.
 */

export function defaultSortFn(
  a: unknown,
  b: unknown,
  direction: "asc" | "desc",
): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === "number" && typeof b === "number") {
    return direction === "asc" ? a - b : b - a;
  }

  if (a instanceof Date && b instanceof Date) {
    return direction === "asc"
      ? a.getTime() - b.getTime()
      : b.getTime() - a.getTime();
  }

  const aStr = String(a).toLowerCase();
  const bStr = String(b).toLowerCase();

  if (direction === "asc") {
    return aStr.localeCompare(bStr);
  }
  return bStr.localeCompare(aStr);
}

export function sortData<T extends BaseRowData>(
  data: T[],
  sortState: ColumnSort[],
  columns: Array<{
    key: string;
    sortKey?: string;
    customSort?: CustomSortFn<T>;
  }>,
  sortMode: "client" | "remote" = "client",
): T[] {
  if (sortMode === "remote" || sortState.length === 0) {
    return data;
  }

  const dataToSort = [...data];

  return dataToSort.sort((a, b) => {
    for (const sort of sortState) {
      const column = columns.find(
        (col) => (col.sortKey || col.key) === sort.key,
      );

      let result = 0;

      if (column?.customSort) {
        result = column.customSort(a, b, sort.direction);
      } else {
        const aValue = a[sort.key as keyof T];
        const bValue = b[sort.key as keyof T];
        result = defaultSortFn(aValue, bValue, sort.direction);
      }

      if (result !== 0) return result;
    }

    return 0;
  });
}

export function handleSortChange(
  columnKey: string,
  currentSortState: ColumnSort[],
  multiSort: boolean,
): ColumnSort[] {
  const existingSortIndex = currentSortState.findIndex(
    (s) => s.key === columnKey,
  );

  let newSortState: ColumnSort[];

  if (existingSortIndex === -1) {
    if (multiSort) {
      newSortState = [
        ...currentSortState,
        { key: columnKey, direction: "asc" },
      ];
    } else {
      newSortState = [{ key: columnKey, direction: "asc" }];
    }
  } else {
    const currentDirection = currentSortState[existingSortIndex].direction;

    if (currentDirection === "asc") {
      newSortState = [...currentSortState];
      newSortState[existingSortIndex] = {
        key: columnKey,
        direction: "desc",
      };
    } else {
      newSortState = currentSortState.filter(
        (_, index) => index !== existingSortIndex,
      );
    }
  }

  return newSortState;
}
