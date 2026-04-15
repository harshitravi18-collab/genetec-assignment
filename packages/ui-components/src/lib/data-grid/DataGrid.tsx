import { useTranslation } from 'react-i18next';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Alert, Card, Empty, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ChangeEvent } from 'react';
import type { DataGridProps } from './DataGrid.types';
import { DataGridPagination } from './DataGridPagination';
import { DataGridToolbar } from './DataGridToolbar';
import { useDataGrid } from './useDataGrid';

export function DataGrid<T extends object>({
  data,
  columns,
  loading = false,
  error = null,
  pageSize = 5,
}: DataGridProps<T>) {
  const { t } = useTranslation();
  const {
    sort,
    filters,
    visibleColumns,
    paginatedData,
    totalItems,
    currentPage,
    hasActiveFilters,
    visibility,
    handleSort,
    handleFilterChange,
    clearFilters,
    toggleColumnVisibility,
    setCurrentPage,
  } = useDataGrid(data, columns, pageSize);

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
              placeholder={`${t('dataGrid.filterPlaceholder', { label: column.label })}`}
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

      <Card styles={{ body: { padding: 16 } }}>
        <Table<T>
          rowKey={(_record, index) => String(index)}
          columns={tableColumns}
          dataSource={paginatedData}
          loading={loading}
          pagination={false}
          size="middle"
          locale={{
            emptyText: <Empty description={t('dataGrid.noMatchingResults')} />,
          }}
        />

        <div style={{ marginTop: 16 }}>
          <DataGridPagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
}
