import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./movies";
import MovieForm from "./movieForm";
import MovieUpdate from "./movieUpdate";

function MoviesRoute() {
  return (
    <Switch>
      <Route path="/movies/new" component={MovieForm} />
      <Route path="/movies/:id" component={MovieUpdate} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
}

export default MoviesRoute;
