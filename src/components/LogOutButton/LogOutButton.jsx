import { Button, MenuItem } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


// NOT CURRENTLY CALLED ANYWHERE.  MOVED FUNCTIONALITY TO MENU NAVIGATION IN FooterNav.jsx

// This button shows up in multiple locations and is styled differently
// because it's styled differently depending on where it is used, the className
// is passed to it from it's parents through React props

function LogOutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login');
  }
  return (
    <Button
      onClick={handleLogOut}
    >Log out</Button>
  )
}

export default LogOutButton;
