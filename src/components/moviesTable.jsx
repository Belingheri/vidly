import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Like from "./common/like";
import Table from "./common/table";

function MoviesTable({ movies, sortedColumn, onLikeToggle, onDelete, onSort }) {
  if (movies.length === 0) return null;
  const columns = [
    {
      value: "Titolo",
      path: "title",
      content: (el) => <Link to={`/movies/${el._id}`}>{el.title}</Link>,
    },
    { path: "genre.name", value: "Genere" },
    { path: "numberInStock", value: "Stock" },
    { path: "dailyRentalRate", value: "Rate" },
    {
      value: "",
      content: (el) => (
        <Like
          onClick={() => {
            onLikeToggle(el);
          }}
          liked={el.liked}
        />
      ),
    },
    {
      value: "",
      content: (el) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            onDelete(el);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      data={movies}
      columns={columns}
      sortedColumn={sortedColumn}
      onSort={onSort}
    />
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
