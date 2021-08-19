import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import background from "../../images/landingPage.jpeg";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import RegisterForm from "../RegisterForm/RegisterForm";

// CUSTOM COMPONENTS

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "125vh",
  },
  welcomeText: {
    marginTop: "40px",
    backgroundColor: "#ACC8AB",
    maxWidth: "700px",
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid container className={classes.backgroundImage} alignItems="center">
        <Grid
          container
          direction="column"
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={10}
            container
            justifyContent="center"
            className={classes.welcomeText}
          >
            <Grid item container justifyContent="center">
            <Typography variant="h4">Welcome to MealTree</Typography>
            </Grid>
            <Typography>
              Create and share meal planning calendars with friends and family.
            </Typography>
          </Grid>

          <Grid item xs={11} container justifyContent="center">
            <RegisterForm />
          </Grid>
          <Grid item className={classes.welcomeText}>
          <Grid item xs={12} container justifyContent="center">
            <Typography>Already a user?</Typography>
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
          </Grid>
          <Grid item xs={9}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;
