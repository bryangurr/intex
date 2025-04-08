interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div>
      {/* Pagination */}
      <div className="row mt-3">
        <div className="col text-center">
          <button
            className="btn btn-primary me-2"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${
                currentPage === index + 1
                  ? "btn-secondary"
                  : "btn-outline-primary"
              } me-1`}
              onClick={() => onPageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(b) => {
            onPageSizeChange(Number(b.target.value));
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
