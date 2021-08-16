import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import TodayIcon from "@material-ui/icons/Today";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Menu, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#4B6F44",
  },
}));

function FooterNav() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (pushTo) => {
    setAnchorEl(false);
    if (pushTo) {
      history.push(`/${pushTo}`);
    }
  };

  // logout and provide history.push functionality to saga
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT", push: history.push });
  };

  return (
    <div>
      <BottomNavigation position="absolute" className={classes.bottomNav}>
        <BottomNavigationAction
          label="Menu"
          value="menu"
          icon={
            <MenuIcon
              fontSize="large"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
          }
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          onClick={() => history.push("/searchApi")}
          icon={<SearchIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Calendar"
          value="calendar"
          onClick={() => history.push("/calendar")}
          icon={<TodayIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          onClick={() => history.push("/favorites")}
          icon={<FavoriteIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Add New"
          value="addNew"
          onClick={() => history.push("/newRecipe")}
          icon={<AddCircleOutlineIcon fontSize="large" />}
        />
        {/* <BottomNavigationAction label="Folder" value="folder" icon={<AccountCircleIcon fontSize="large" />} /> */}
      </BottomNavigation>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose(null);
        }}
      >
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        <MenuItem >
          Profile Page
        </MenuItem>
        <MenuItem onClick={() => handleClose("calendarList")}>
          Calendar List
        </MenuItem>
        <MenuItem onClick={() => handleClose("fullCalendar")}>
          Planned Meals
        </MenuItem>
      </Menu>
    </div>
  );
}

export default FooterNav;
