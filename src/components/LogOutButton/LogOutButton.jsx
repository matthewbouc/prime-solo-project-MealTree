import { Button, MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



// NOT CURRENTLY CALLED ANYWHERE.  MOVED FUNCTIONALITY TO MENU NAVIGATION IN FooterNav.jsx
function LogOutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    history.push("/login");
    dispatch({ type: "LOGOUT" });
  };
  return <Button onClick={handleLogOut}>Log out</Button>;
}

export default LogOutButton;
