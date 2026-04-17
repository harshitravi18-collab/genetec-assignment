import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const hideableColumns = columns.filter((column) => column.canHide !== false);

  return (
    <div
      data-testid="data-grid-toolbar"
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
          data-testid="data-grid-clear-filters"
          icon={<ReloadOutlined />}
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          {t('dataGrid.clearFilters')}
        </Button>
      </Space>

      <Dropdown
        data-testid="data-grid-columns-dropdown"
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
        <Button data-testid="data-grid-columns-button" icon={<EyeOutlined />}>
          {t('dataGrid.columns')}
        </Button>
      </Dropdown>
    </div>
  );
}
