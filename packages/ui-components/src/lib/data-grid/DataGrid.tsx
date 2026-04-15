import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Alert, Empty, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ChangeEvent } from 'react';
import type { DataGridProps } from './DataGrid.types';
import { useTranslation } from 'react-i18next';
import { useDataGrid } from './useDataGrid';
import { DataGridToolbar } from './DataGridToolbar';

export function DataGrid<T extends object>({
  data,
  columns,
  loading = false,
  error = null,
}: DataGridProps<T>) {
  const { t } = useTranslation();
  const {
    sort,
    filters,
    visibleColumns,
    sortedData,
    hasActiveFilters,
    visibility,
    handleSort,
    handleFilterChange,
    clearFilters,
    toggleColumnVisibility,
  } = useDataGrid(data, columns);

  if (error) {
    return <Alert type="error" message={error} showIcon />;
  }

  if (!loading && data.length === 0) {
    return <Empty description={t('dataGrid.noData')} />;
  }

  const tableColumns: ColumnsType<T> = visibleColumns.map((column) => {
    const isSorted = sort?.key === column.key;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleFilterChange(column.key, event.currentTarget.value);
    };

    return {
      key: column.key,
      title: (
        <div style={{ display: 'grid', gap: 8 }}>
          <button
            type="button"
            onClick={() =>
              column.sortable ? handleSort(column.key) : undefined
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: column.sortable ? 'pointer' : 'default',
              fontWeight: 600,
              textAlign: 'left',
            }}
          >
            <span>{column.label}</span>

            {column.sortable ? (
              <span
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  lineHeight: 1,
                  opacity: isSorted ? 1 : 0.45,
                }}
              >
                <CaretUpOutlined
                  style={{
                    fontSize: 10,
                    color:
                      isSorted && sort?.direction === 'asc'
                        ? '#1677ff'
                        : undefined,
                  }}
                />
                <CaretDownOutlined
                  style={{
                    fontSize: 10,
                    color:
                      isSorted && sort?.direction === 'desc'
                        ? '#1677ff'
                        : undefined,
                  }}
                />
              </span>
            ) : null}
          </button>

          {column.filterable ? (
            <Input
              size="small"
              value={filters[column.key] ?? ''}
              onChange={handleInputChange}
              placeholder={`Filter ${column.label}`}
              prefix={<SearchOutlined />}
              allowClear
            />
          ) : null}
        </div>
      ),
      render: (_value: unknown, row: T) => column.accessor(row),
    };
  });

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <DataGridToolbar
        columns={columns}
        visibility={visibility}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        onToggleColumnVisibility={toggleColumnVisibility}
      />

      <Table<T>
        rowKey={(_record, index) => String(index)}
        columns={tableColumns}
        dataSource={sortedData}
        loading={loading}
        pagination={false}
        locale={{
          emptyText: <Empty description={t('dataGrid.noMatchingResults')} />,
        }}
      />
    </div>
  );
}
