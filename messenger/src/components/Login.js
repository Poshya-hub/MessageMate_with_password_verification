import React, { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
