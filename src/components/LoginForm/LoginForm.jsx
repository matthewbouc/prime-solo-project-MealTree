import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button, Grid, TextField } from '@material-ui/core';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            label="Username"
            variant="filled"
            color="secondary"
            style={{backgroundColor: "lightgrey"}}
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </Grid>
      <Grid item>
          <TextField
            type="password"
            label="password"
            variant="filled"
            color="secondary"
            style={{backgroundColor: "lightgrey"}}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" type="submit">Sign In</Button>
      </Grid>
    </Grid>
    </form>
  );
}

export default LoginForm;
