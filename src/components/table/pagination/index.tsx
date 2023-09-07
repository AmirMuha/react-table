import { useAtom } from "jotai";
import React, { memo } from "react";
import { TableProps } from "types";

const PaginationComponent = <T = unknown,>(props: TableProps<T>): React.ReactElement => {
  const [data] = useAtom(props.atom.data);
  const [currentPage] = useAtom(props.atom.pagination.currentPage);
  const [itemsPerPage] = useAtom(props.atom.pagination.itemsPerPage);

  const totalPages = itemsPerPage && itemsPerPage !== 0 ? Math.ceil(data.length / itemsPerPage) : 1;
  const IS_LAST_PAGE = currentPage === 1;
  const IS_FIRST_PAGE = currentPage === 1;
  return (
    <div className="am_container__pagination">
      <button
        disabled={IS_LAST_PAGE}
        // onClick={() => setCurrentPage(currentPage - 1)}
      >
        قبل
      </button>
      <span>
        صفحه {currentPage} از {totalPages}
      </span>
      <button
        disabled={IS_FIRST_PAGE}
        // onClick={() => setCurrentPage(currentPage + 1)}
      >
        بعد
      </button>
    </div>
  );
};

const areEqual = () => true;
const Pagination: typeof PaginationComponent = memo(PaginationComponent, areEqual) as any;
export default Pagination;
