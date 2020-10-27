import React from "react";
import { useParams } from "react-router-dom";

import MovieForm from "./movieForm";

function MovieUpdate() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Modifica</h1>
      <MovieForm id={id} />
    </div>
  );
}

export default MovieUpdate;
