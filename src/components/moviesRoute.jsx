import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./movies";
import MovieInsert from "./movieInsert";
import MovieUpdate from "./movieUpdate";

function MoviesRoute() {
  return (
    <Switch>
      <Route path="/movies/new" component={MovieInsert} />
      <Route path="/movies/:id" component={MovieUpdate} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
}

export default MoviesRoute;
