import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import background from "../../images/login-register.jpeg";
import "./LoginPage.css";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Nav from "../Nav/Nav";

const useStyles = makeStyles((theme) => ({
  // backgroundImage: {
  //   backgroundImage: `url(${background})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'repeat',
  //   backgroundAttachment: 'fixed',
  //   // width: '100vw',
  //   height: '100vh',
  // }
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Nav />
      <Grid
        container
        className='loginBackground'
        alignContent='center'
        justifyContent='center'
      >
        <Grid item xs={9} container justifyContent='center'>
          <LoginForm />
        </Grid>
        <Grid item xs={12} container justifyContent='center'>
          <Typography>Don't have a MealTree account?</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent='center'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              history.push("/registration");
            }}
          >
            Join Now
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;
