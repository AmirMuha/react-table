export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const IS_LAST_PAGE = currentPage === 1;
  const IS_FIRST_PAGE = currentPage === 1;
  return (
    <div className="am_container__pagination">
      <button
        disabled={IS_LAST_PAGE}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        قبل
      </button>
      <span>
        صفحه {currentPage} از {totalPages}
      </span>
      <button
        disabled={IS_FIRST_PAGE}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        بعد
      </button>
    </div>
  );
}
