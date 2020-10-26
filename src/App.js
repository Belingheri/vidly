import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//import logo from "./logo.svg";
import "./App.css";

import NotFound from "./components/common/notFound";

import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MoviesRoute from "./components/moviesRoute";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <div>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies" component={MoviesRoute} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
