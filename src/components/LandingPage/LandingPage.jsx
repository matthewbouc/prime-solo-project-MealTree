import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import background from '../../images/blurLandingPage.jpeg';
import mealTree from '../../images/mealTree.png';
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    width: '100vw',
    height: '100vh',
  }
}));

function LandingPage() {
  const classes = useStyles();
  const [isRegistered, setIsRegistered] = useState(false);
  const history = useHistory();

  const onLogin = (event) => {
    setIsRegistered(!isRegistered);
    // history.push('/login');
  };

  return (
    <>
    <Nav />

    <Container className={classes.backgroundImage}>


    <Grid container justifyContent="center">
    <Grid item xs={12}>
        
    </Grid>
      </Grid>
      <Grid container justifyContent="center" alignContent="center" spacing={8}>
      <Grid item xs={9} >
        <Typography color="default">Create and share meal plans</Typography>
      </Grid>
      <Grid item xs={11}>
        {isRegistered ? <LoginForm /> : <RegisterForm />}     
      </Grid>     
      <Grid item xs={9} >
          <h4>Already a Member?</h4>
          <Button color="primary" variant="contained" onClick={onLogin}>
            Login
          </Button>
      </Grid>
      <Grid item alignItems="baseline">
      <Footer />
      </Grid>
      </Grid>

      </Container>
      </>
  );
}

export default LandingPage;
