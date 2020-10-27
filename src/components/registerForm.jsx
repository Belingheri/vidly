import React, { useState } from "react";
import Joi from "joi-browser";

import Form from "./common/form";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    console.log("submit");
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
    {
      name: "name",
      type: "input",
      attributes: {
        type: "text",
        label: "Nome",
      },
      value: name,
      setValue: setName,
    },
  ];
  const schema = {
    username: Joi.string().min(5).max(20).required().label("Username"),
    name: Joi.string()
      .min(5)
      .max(20)
      .required()
      .regex(/^[A-Z,a-z]{5,20}$/)
      .label("Nome"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  return (
    <div>
      <h1>Registra</h1>
      <Form
        data={structure}
        schema={schema}
        submitButton="Registra"
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default RegisterForm;
