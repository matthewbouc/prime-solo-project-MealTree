import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login');
  }
  return (
    <ListItem button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleLogOut}
    >
      <ListItemText primary="Log out" />
    </ListItem>
  );
}

export default LogOutButton;
