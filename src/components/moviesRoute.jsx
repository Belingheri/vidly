import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./movies";
import MovieForm from "./movieForm";

function MoviesRoute() {
  return (
    <Switch>
      <Route path="/movies/:id" component={MovieForm} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
}

export default MoviesRoute;
