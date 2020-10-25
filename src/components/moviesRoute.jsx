import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./movies";
import MoviesDetail from "./moviesDetail";

function MoviesRoute() {
  return (
    <Switch>
      <Route path="/movies/:id" component={MoviesDetail} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
}

export default MoviesRoute;
