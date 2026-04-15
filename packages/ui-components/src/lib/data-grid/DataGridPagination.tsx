import { Pagination } from 'antd';

type DataGridPaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export const DataGridPagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: DataGridPaginationProps) => {
  if (totalItems <= pageSize) {
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        showQuickJumper
        showLessItems
      />
    </div>
  );
};
