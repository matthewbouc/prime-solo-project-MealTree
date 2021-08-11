import React from 'react';
import './Nav.css';
import mealTree from '../../images/mealTree.png';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';


function Nav() {
  const history = useHistory();



  // may implement header functionality at a later point
  // let loginLinkData = {
  //   path: '/login',
  //   text: 'Login / Register',
  // };

  // if (user.id != null) {
  //   loginLinkData.path = '/calendar';
  //   loginLinkData.text = 'Home';
  // }

  const onLogin = () => {
    history.push('/login');
  };

  const onSignUp = () => {
    history.push('/registration');
  }

  return (

    <Grid container className="background" justifyContent="center">
      <Grid item xs={6} container justifyContent="center">
      <img src={mealTree} height="45px" onClick={()=> history.push('/home')}/>
      </Grid>
      <Grid item xs={6} container justifyContent="center">
      <Button color="primary" variant="contained" onClick={onLogin}>
                Sign in
      </Button>
      <Button color="primary" variant="contained" onClick={onSignUp}>
                Sign up
      </Button>
      </Grid>

    </Grid>
  );
}

export default Nav;
