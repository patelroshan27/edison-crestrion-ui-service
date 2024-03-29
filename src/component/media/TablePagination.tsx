import React, { type ReactNode } from 'react';
import { Pagination } from '@nextui-org/react';

interface TablePaginationProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
  children?: ReactNode;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pages,
  setPage,
  children,
}) => {
  return (
    <div className="border border-neutral-400 rounded-2xl bg-neutral-700 py-2 px-2 flex justify-center items-center">
      <Pagination
        size="lg"
        showControls
        classNames={{
          cursor: 'bg-foreground text-background',
          item: 'text-xl mx-1',
        }}
        color="default"
        page={page}
        total={pages}
        variant="light"
        isCompact
        onChange={setPage}
      />
      {children}
    </div>
  );
};
