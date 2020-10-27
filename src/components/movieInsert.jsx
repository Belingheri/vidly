import React from "react";
import { useParams } from "react-router-dom";

import MovieForm from "./movieForm";

function MovieInsert() {
  const { id } = useParams();

  return (
    <div className="row">
      <div className="col">
        <h1>Crea</h1>
        <MovieForm id={id} />
      </div>
    </div>
  );
}

export default MovieInsert;
