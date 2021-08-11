import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
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
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item>

                    <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
          </Grid>
          <Grid item>

                    <TextField
            label="Email"
            variant="outlined"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          </Grid>
          <Grid item>

          <TextField
            label="Username"
            variant="outlined"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          </Grid>
          <Grid item>

          <TextField
            label="Password"
            variant="outlined"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
      <Grid item>
        <Button type="submit" color="primary" variant="contained">Sign up</Button>
      </Grid>
      </Grid>

    </form>
  );
}

export default RegisterForm;
