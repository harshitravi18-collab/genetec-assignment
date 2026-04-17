import { Pagination } from 'antd';

type DataGridPaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export const DataGridPagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: DataGridPaginationProps) => {
  if (totalItems <= pageSize) {
    return null;
  }

  return (
    <div data-testid="data-grid-pagination" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Pagination
        data-testid="data-grid-pagination-control"
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        onShowSizeChange={(_page, size) => onPageSizeChange(size)}
        showSizeChanger
        pageSizeOptions={[10, 20, 50]}
        showQuickJumper
        showLessItems
      />
    </div>
  );
};
