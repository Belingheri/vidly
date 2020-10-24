import React from "react";
import PropTypes from "prop-types";

import Like from "./common/like";
import TableHeader from "./common/tableHeader";

function MoviesTable(props) {
  const { movies, sortedColumn, onLikeToggle, onDelete, onSort } = props;

  if (movies.length === 0) return null;
  const columns = [
    { key: "title", value: "Titolo" },
    { key: "genre.name", value: "Genere" },
    { key: "numberInStock", value: "Stock" },
    { key: "dailyRentalRate", value: "Rate" },
    { key: null, value: "" },
    { key: null, value: "" },
  ];

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      />
      <tbody>
        {movies.map((el) => (
          <tr id={el._id} key={el._id}>
            <td>{el.title}</td>
            <td>{el.genre.name}</td>
            <td>{el.numberInStock}</td>
            <td>{el.dailyRentalRate}</td>
            <td>
              <Like
                onClick={() => {
                  onLikeToggle(el);
                }}
                liked={el.liked}
              />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onDelete(el);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onLikeToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default MoviesTable;
