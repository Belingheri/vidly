import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { getcurrentUser } from "./services/authService";

import NotFound from "./components/common/notFound";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MoviesRoute from "./components/moviesRoute";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

function App() {
  const [user] = useState(getcurrentUser());
  return (
    <div>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/registra" component={RegisterForm} />
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
