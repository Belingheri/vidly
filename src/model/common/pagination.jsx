import React from "react";
import PropTypes from "prop-types";

function Pagination({ totalRows, rowsInPage, actualPage, onChange }) {
  const paginationButtons = Math.ceil(totalRows / rowsInPage);
  if (paginationButtons < 2) return null;
  const getClasses = (pageNumber) => {
    let classes = "page-item";
    return (classes += pageNumber === actualPage ? " active" : "");
  };
  return (
    <ul className="pagination">
      {Array.from({ length: paginationButtons }, (_, i) => i + 1).map((v) => (
        <li key={v} className={getClasses(v)}>
          <a
            className="page-link"
            onClick={() => {
              onChange(v);
            }}
            href="/#"
          >
            {v}
          </a>
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  totalRows: PropTypes.number.isRequired,
  rowsInPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  actualPage: PropTypes.number,
};

Pagination.defaultProps = {
  actualPage: 1,
};

export default Pagination;
