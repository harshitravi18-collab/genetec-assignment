import { Button, Checkbox, Dropdown, Space } from 'antd';
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Column, VisibilityState } from './DataGrid.types';

type DataGridToolbarProps<T> = {
  columns: Column<T>[];
  visibility: VisibilityState;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onToggleColumnVisibility: (key: string) => void;
};

export function DataGridToolbar<T>({
  columns,
  visibility,
  hasActiveFilters,
  onClearFilters,
  onToggleColumnVisibility,
}: DataGridToolbarProps<T>) {
  const hideableColumns = columns.filter((column) => column.canHide !== false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <Space>
        <Button
          icon={<ReloadOutlined />}
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear filters
        </Button>
      </Space>

      <Dropdown
        trigger={['click']}
        menu={{
          items: hideableColumns.map((column) => ({
            key: column.key,
            label: (
              <Checkbox
                checked={visibility[column.key] !== false}
                onChange={() => onToggleColumnVisibility(column.key)}
              >
                {column.label}
              </Checkbox>
            ),
          })),
        }}
      >
        <Button icon={<EyeOutlined />}>Columns</Button>
      </Dropdown>
    </div>
  );
}
