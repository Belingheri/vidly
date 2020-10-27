import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./movies";
import MovieForm from "./movieForm";
import MoviesDetail from "./moviesDetail";

function MoviesRoute() {
  return (
    <Switch>
      <Route path="/movies/new" component={MovieForm} />
      <Route path="/movies/:id" component={MoviesDetail} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
}

export default MoviesRoute;
