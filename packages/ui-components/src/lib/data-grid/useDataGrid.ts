import { useEffect, useMemo, useState } from 'react';
import type {
  Column,
  FiltersState,
  SortState,
  VisibilityState,
} from './DataGrid.types';
import { useDebouncedValue } from './useDebouncedValue';

export const useDataGrid = <T>(
  data: T[],
  columns: Column<T>[],
  initialPageSize = 5,
) => {
  const [sort, setSort] = useState<SortState>(null);
  const [filters, setFilters] = useState<FiltersState>({});
  const [visibility, setVisibility] = useState<VisibilityState>(() =>
    Object.fromEntries(
      columns.map((column) => [column.key, column.hidden ? false : true]),
    ),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const debouncedFilters = useDebouncedValue(filters, 250);

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibility[column.key] !== false),
    [columns, visibility],
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return visibleColumns.every((column) => {
        if (!column.filterable) {
          return true;
        }

        const filterValue = debouncedFilters[column.key]?.trim().toLowerCase();
        if (!filterValue) {
          return true;
        }

        const rawValue = column.filterAccessor
          ? column.filterAccessor(row)
          : String(column.accessor(row));

        return rawValue.toLowerCase().includes(filterValue);
      });
    });
  }, [data, debouncedFilters, visibleColumns]);

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

  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilters, sort, visibility, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, sortedData]);

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

  const clearFilters = () => {
    setFilters({});
  };

  const toggleColumnVisibility = (key: string) => {
    setVisibility((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value.trim() !== '',
  );

  return {
    sort,
    filters,
    visibleColumns,
    sortedData,
    paginatedData,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    hasActiveFilters,
    visibility,
    handleSort,
    handleFilterChange,
    clearFilters,
    toggleColumnVisibility,
    setCurrentPage,
    setPageSize,
  };
};
