import React, { useState } from "react";
import Input from "./common/input";

function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget }) => {
    const newAccount = { ...account };
    newAccount[currentTarget.name] = currentTarget.value;
    setAccount(newAccount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = account;
    const errors = {};

    if (username.trim() === "") errors.username = "Username necessario";
    if (password.trim() === "") errors.password = "Password necessaria";

    if (Object.values(errors).length > 0) {
      return setErrors(errors);
    }

    console.log("submitted");
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          error={errors.password}
          type="password"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Invia</button>
      </form>
    </div>
  );
}

export default LoginForm;
