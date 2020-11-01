import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import { login } from "./../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: "",
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) toast.error(e.response.data);
    }
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
