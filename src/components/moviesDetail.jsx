import React from "react";
import { useHistory, useParams } from "react-router-dom";

function MoviesDetail() {
  const { id } = useParams();
  const history = useHistory();

  const handleSave = () => {
    history.replace("/movies");
  };

  return (
    <div className="container">
      <h1>Dettaglio {id}</h1>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default MoviesDetail;
