import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMovie } from "../services/fakeMovieService";

import MovieForm from "./movieForm";

function MovieUpdate() {
  const { id } = useParams();
  const history = useHistory();
  const movie = getMovie(id);
  if (!movie) history.replace("/not-found");

  return (
    <div className="row">
      <div className="col">
        <h1>Modifica {movie.title}</h1>
        <MovieForm movie={movie} />
      </div>
    </div>
  );
}

export default MovieUpdate;
