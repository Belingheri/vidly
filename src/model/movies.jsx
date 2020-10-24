import React, { useState } from "react";
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
  const [orderBy, setOrderBy] = useState("title");

  const rowsInPage = 4;

  const movies =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((el) => el.genre._id === selectedGenre._id)
      : allMovies;

  const sortedMovies = _.orderBy(movies, orderBy);

  const firstElementIndex = (actualPage - 1) * rowsInPage;
  const lastElementIndex = actualPage * rowsInPage;
  const pageMovies = sortedMovies.slice(firstElementIndex, lastElementIndex);

  const getMessage = () => (
    <h2>
      {movies.length > 0
        ? `Sono presenti ${movies.length} film`
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

  const handleOnSort = (attribute) => {
    setOrderBy(attribute);
    console.log(attribute);
  };

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
          {getMessage()}
          <MoviesTable
            movies={pageMovies}
            onLikeToggle={handleLikeClick}
            onDelete={handleDeleteMovie}
            onSort={handleOnSort}
          />
          <Pagination
            rowsInPage={rowsInPage}
            actualPage={actualPage}
            totalRows={movies.length}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Movies;
