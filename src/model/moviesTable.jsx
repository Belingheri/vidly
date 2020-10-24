import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import Like from "./common/like";
import ArrowOrder from "./common/arrowOrder";

function MoviesTable(props) {
  const { movies, sortedColumn, onLikeToggle, onDelete, onSort } = props;

  if (movies.length === 0) return null;
  const headersName = [
    { key: "title", value: "Titolo" },
    { key: "genre.name", value: "Genere" },
    { key: "numberInStock", value: "Stock" },
    { key: "dailyRentalRate", value: "Rate" },
    { key: null, value: "" },
    { key: null, value: "" },
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          {headersName.map((el) => (
            <th
              key={uuidv4()}
              onClick={() => {
                if (el.key) onSort(el.key);
              }}
            >
              {el.value}
              <ArrowOrder
                order={sortedColumn.path === el.key ? sortedColumn.order : ""}
              />
            </th>
          ))}
        </tr>
      </thead>
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
