import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import background from '../../images/login-register.jpeg';
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Nav from '../Nav/Nav';

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // width: '100vw',
    height: '100vh',
    paddingTop: '50px',
  }
}));


function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
    <Nav />

    <Grid container className={classes.backgroundImage} alignContent="center" justifyContent="center">
    <Grid item xs={9} container justifyContent="center">
    <LoginForm />
    </Grid>
    <Grid item xs={9} container justifyContent="center">
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </Grid>
      </Grid>
      </>
  );
}

export default LoginPage;
