import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Alert, Empty, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import type { DataGridProps } from './DataGrid.types';
import { DataGridFilters } from './DataGridFilters';
import { useDataGrid } from './useDataGrid';

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
    handleSort,
    handleFilterChange,
  } = useDataGrid(data, columns);

  if (error) {
    return <Alert type="error" message={error} showIcon />;
  }

  if (!loading && data.length === 0) {
    return <Empty description={t('dataGrid.noData')} />;
  }

  const tableColumns: ColumnsType<T> = visibleColumns.map((column) => {
    const isSorted = sort?.key === column.key;

    return {
      key: column.key,
      title: (
        <button
          type="button"
          onClick={() => (column.sortable ? handleSort(column.key) : undefined)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: column.sortable ? 'pointer' : 'default',
            fontWeight: 600,
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
      ),
      render: (_value: unknown, row: T) => column.accessor(row),
    };
  });

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <DataGridFilters
        columns={visibleColumns}
        filters={filters}
        onFilterChange={handleFilterChange}
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
