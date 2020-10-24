import React, { useState } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

function Movies() {
  const [allMovies, setAllMovies] = useState(getMovies());
  const [genres] = useState([{ name: "All" }, ...getGenres()]);
  const [actualPage, setActualPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({});

  const rowsInPage = 4;

  const movies =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((el) => el.genre._id === selectedGenre._id)
      : allMovies;

  const getMessage = () => (
    <h2>
      {movies.length > 0
        ? `Sono presenti ${movies.length} film`
        : "Non sono presenti film"}
    </h2>
  );

  const deleteElement = (movie) => {
    deleteMovie(movie._id);
    const newAllMovies = [...allMovies];
    const index = newAllMovies.indexOf((el) => el._id !== movie._id);
    newAllMovies.splice(index, 1);
    setAllMovies(newAllMovies);
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

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          itemList={genres}
          selectedItem={selectedGenre}
          onChange={handleChangeGenreFilter}
        />
      </div>
      <div className="col">
        <div className="Movie">
          {getMessage()}
          {movies.length > 0 && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>titolo</th>
                    <th>genere</th>
                    <th>stock</th>
                    <th>rate</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((el, key) => {
                    if (
                      key >= (actualPage - 1) * rowsInPage &&
                      key < actualPage * rowsInPage
                    )
                      return (
                        <tr id={el._id} key={el._id}>
                          <td>{el.title}</td>
                          <td>{el.genre.name}</td>
                          <td>{el.numberInStock}</td>
                          <td>{el.dailyRentalRate}</td>
                          <td>
                            <Like
                              onClick={() => {
                                handleLikeClick(el);
                              }}
                              liked={el.liked}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteElement(el);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
              <Pagination
                rowsInPage={rowsInPage}
                actualPage={actualPage}
                totalRows={movies.length}
                onChange={handleOnChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movies;
