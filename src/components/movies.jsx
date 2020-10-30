import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const [sortedColumn, setSortedColumn] = useState({
    path: "title",
    order: "asc",
  });

  const rowsInPage = 4;

  async function getGenresData() {
    const allGenres = await getGenres();
    setGenres([{ name: "All" }, ...allGenres]);
  }
  async function getMoviesData() {
    const allMovies = await getMovies();
    setAllMovies(allMovies);
  }

  useEffect(() => {
    getGenresData();
    getMoviesData();
  }, []);

  const getPaginateMovies = () => {
    let movies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((el) => el.genre._id === selectedGenre._id)
        : allMovies;

    if (searchQuery)
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

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

  const handleDeleteMovie = async (movie) => {
    const originalMovies = [...allMovies];
    const movies = originalMovies.filter((e) => e._id !== movie._id);
    setAllMovies(movies);
    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("E gia stato cancellato");

      setAllMovies(originalMovies);
    }
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
    setSearchQuery("");
    setActualPage(1);
  };

  const handleOnSort = (newSortedColumn) => {
    setSortedColumn(newSortedColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre({});
    setActualPage(1);
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
          {getMessage()}
          <button className="btn btn-primary" onClick={handleAddMovie}>
            New Movie
          </button>
          <SearchBox query={searchQuery} onSearch={handleSearch} />
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
