import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

function Movies() {
  const [allMovies, setAllMovies] = useState(getMovies());
  const [genres] = useState([{ name: "All" }, ...getGenres()]);
  const [actualPage, setActualPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({});
  const history = useHistory();
  const [sortedColumn, setSortedColumn] = useState({
    path: "title",
    order: "asc",
  });

  const rowsInPage = 4;

  const getPaginateMovies = () => {
    const movies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((el) => el.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      movies,
      sortedColumn.path,
      sortedColumn.order
    );

    const firstElementIndex = (actualPage - 1) * rowsInPage;
    const lastElementIndex = actualPage * rowsInPage;
    const pageMovies = sortedMovies.slice(firstElementIndex, lastElementIndex);
    return { totalMovies: movies.length, pageMovies };
  };

  const getMessage = () => (
    <h2>
      {totalMovies > 0
        ? `Sono presenti ${totalMovies} film`
        : "Non sono presenti film"}
    </h2>
  );

  const handleDeleteMovie = (movie) => {
    const newAllMovies = [...allMovies];
    const index = newAllMovies.indexOf(movie);
    newAllMovies.splice(index, 1);
    setAllMovies(newAllMovies);
    deleteMovie(movie._id);
  };

  const handleLikeClick = (movie) => {
    const newAllMovies = [...allMovies];
    const index = newAllMovies.indexOf(movie);
    newAllMovies[index].liked = !newAllMovies[index].liked;
    setAllMovies(newAllMovies);
  };

  const handleOnChange = (newPage) => {
    setActualPage(newPage);
  };

  const handleChangeGenreFilter = (genre) => {
    setSelectedGenre(genre);
    setActualPage(1);
  };

  const handleOnSort = (newSortedColumn) => {
    setSortedColumn(newSortedColumn);
  };

  const handleAddMovie = (e) => {
    history.push("movies/new");
  };

  const { totalMovies, pageMovies } = getPaginateMovies();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          itemList={genres}
          selectedItem={selectedGenre}
          onChange={handleChangeGenreFilter}
        />
      </div>
      <div className="col">
        <div className="Movie">
          <button className="btn btn-primary" onClick={handleAddMovie}>
            New Movie
          </button>
          {getMessage()}
          <MoviesTable
            movies={pageMovies}
            sortedColumn={sortedColumn}
            onLikeToggle={handleLikeClick}
            onDelete={handleDeleteMovie}
            onSort={handleOnSort}
          />
          <Pagination
            rowsInPage={rowsInPage}
            actualPage={actualPage}
            totalRows={totalMovies}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Movies;
