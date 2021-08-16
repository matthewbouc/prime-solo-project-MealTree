import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className='formPanel' onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className='alert' role='alert'>
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            label='First Name'
            variant='filled'
            color='secondary'
            value={firstName}
            style={{ backgroundColor: "lightgrey" }}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Last Name'
            variant='filled'
            color='secondary'
            value={lastName}
            style={{ backgroundColor: "lightgrey" }}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Email'
            variant='filled'
            color='secondary'
            value={email}
            style={{ backgroundColor: "lightgrey" }}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Username'
            variant='filled'
            color='secondary'
            value={username}
            style={{ backgroundColor: "lightgrey" }}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Password'
            variant='filled'
            color='secondary'
            type='password'
            value={password}
            style={{ backgroundColor: "lightgrey" }}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' color='primary' variant='outlined'>
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
