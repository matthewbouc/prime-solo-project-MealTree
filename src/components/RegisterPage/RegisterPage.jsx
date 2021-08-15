import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import background from "../../images/login-register.jpeg";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Nav from "../Nav/Nav";
import "./RegisterPage.css";

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    paddingTop: "50px",
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Nav />
      <Grid
        container
        className="registerBackground"
        alignContent="center"
        justifyContent="center"
      >
        <Grid item xs={9} container justifyContent="center">
          <RegisterForm />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Typography>Already have a MealTree account?</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/login");
            }}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default RegisterPage;
