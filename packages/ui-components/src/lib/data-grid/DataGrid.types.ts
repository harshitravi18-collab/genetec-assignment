import type { ReactNode } from 'react';

export type Column<T> = {
  key: string;
  label: string;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  sortAccessor?: (row: T) => string | number;
  filterable?: boolean;
  filterAccessor?: (row: T) => string;
  hidden?: boolean;
};

export type SortState = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export type FiltersState = Record<string, string>;

export type DataGridProps<T> = {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
};
