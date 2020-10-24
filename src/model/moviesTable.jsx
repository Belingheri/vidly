import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import Like from "./common/like";

function MoviesTable(props) {
  const { movies, onLikeToggle, onDelete } = props;

  if (movies.length === 0) return null;
  const headersName = [
    "titolo",
    "genere",
    "stock",
    "rate",
    null,
    null,
  ].map((el) => (el ? el.charAt(0).toUpperCase() + el.slice(1) : ""));

  return (
    <table className="table">
      <thead>
        <tr>
          {headersName.map((el) => (
            <th key={uuidv4()}>{el}</th>
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
  onLikeToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MoviesTable;
