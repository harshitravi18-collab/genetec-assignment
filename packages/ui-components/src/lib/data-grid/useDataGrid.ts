import { useMemo, useState } from 'react';
import type { Column, FiltersState, SortState } from './DataGrid.types';

export const useDataGrid = <T>(data: T[], columns: Column<T>[]) => {
  const [sort, setSort] = useState<SortState>(null);
  const [filters, setFilters] = useState<FiltersState>({});

  const visibleColumns = useMemo(
    () => columns.filter((column) => !column.hidden),
    [columns],
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return visibleColumns.every((column) => {
        if (!column.filterable) {
          return true;
        }

        const filterValue = filters[column.key]?.trim().toLowerCase();
        if (!filterValue) {
          return true;
        }

        const rawValue = column.filterAccessor
          ? column.filterAccessor(row)
          : String(column.accessor(row));

        return rawValue.toLowerCase().includes(filterValue);
      });
    });
  }, [data, filters, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sort) {
      return filteredData;
    }

    const column = visibleColumns.find((item) => item.key === sort.key);
    if (!column?.sortAccessor) {
      return filteredData;
    }

    const { sortAccessor } = column;

    return [...filteredData].sort((a, b) => {
      const aVal = sortAccessor(a);
      const bVal = sortAccessor(b);

      if (aVal < bVal) {
        return sort.direction === 'asc' ? -1 : 1;
      }

      if (aVal > bVal) {
        return sort.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredData, sort, visibleColumns]);

  const handleSort = (key: string) => {
    setSort((previousSort) => {
      if (!previousSort || previousSort.key !== key) {
        return { key, direction: 'asc' };
      }

      if (previousSort.direction === 'asc') {
        return { key, direction: 'desc' };
      }

      return null;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  };

  return {
    sort,
    filters,
    visibleColumns,
    sortedData,
    handleSort,
    handleFilterChange,
  };
};
