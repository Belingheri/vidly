import React, { useState } from "react";
import Joi from "joi-browser";

import Form from "./common/form";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    console.log("submit");
    console.log("username", username);
    console.log("password", password);
  };

  const structure = [
    {
      name: "username",
      type: "input",
      attributes: {
        type: "text",
        label: "Username",
      },
      value: username,
      setValue: setUsername,
    },
    {
      name: "password",
      type: "input",
      attributes: {
        type: "password",
        label: "Password",
      },
      value: password,
      setValue: setPassword,
    },
  ];
  const schema = {
    username: Joi.string().min(5).max(20).required().label("Username"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        data={structure}
        schema={schema}
        submitButton="Login"
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default LoginForm;
