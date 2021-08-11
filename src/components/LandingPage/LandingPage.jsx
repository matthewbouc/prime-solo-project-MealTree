import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import background from '../../images/landingPage.jpeg';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';


// CUSTOM COMPONENTS

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  }
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid container className={classes.backgroundImage} alignItems="center">
        <Grid container direction="column" spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} container justifyContent="center">
            <Typography color="error">Throw Some text or maybe pictures here</Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Typography>MORE TEXT OR IMAGES HERE</Typography>
          </Grid>
          <Grid item xs={9} >
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;
