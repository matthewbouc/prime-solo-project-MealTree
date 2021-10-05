import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import Nav from "../Nav/Nav";


function LoginPage() {
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
