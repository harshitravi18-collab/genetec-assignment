import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { Column } from './DataGrid.types';

type DataGridFiltersProps<T> = {
  columns: Column<T>[];
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
};

export function DataGridFilters<T>({
  columns,
  filters,
  onFilterChange,
}: DataGridFiltersProps<T>) {
  const { t } = useTranslation();
  const filterableColumns = columns.filter((column) => column.filterable);

  if (filterableColumns.length === 0) {
    return null;
  }

  const handleChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onFilterChange(key, event.currentTarget.value);
    };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      }}
    >
      {filterableColumns.map((column) => (
        <div key={column.key} style={{ display: 'grid', gap: 6 }}>
          <label
            htmlFor={`filter-${column.key}`}
            style={{ fontSize: 14, fontWeight: 500 }}
          >
            {column.label}
          </label>

          <Input
            id={`filter-${column.key}`}
            value={filters[column.key] ?? ''}
            onChange={handleChange(column.key)}
            placeholder={t('dataGrid.filterPlaceholder', { label: column.label })}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
      ))}
    </div>
  );
}
