import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import background from '../../images/blurLandingPage.jpeg';
import { Container, Grid, makeStyles } from '@material-ui/core';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';


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
    <Grid className={classes.backgroundImage}>

      <div >
        <div >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>
        </div>
        <div >
          {isRegistered ? <LoginForm /> : <RegisterForm />}          
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </Grid>
      </>
  );
}

export default LandingPage;
