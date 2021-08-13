import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import TodayIcon from '@material-ui/icons/Today';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { CallReceived } from '@material-ui/icons';
import { Drawer, Menu, MenuItem } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';


const useStyles = makeStyles((theme) => ({
    bottomNav: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#4B6F44',
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
}));

function FooterNav() {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (pushTo) => {
    setAnchorEl(false);
    if (pushTo) {
      history.push(`/${pushTo}`)
    }
  }

  return (
    <div>
      <BottomNavigation position="absolute" className={classes.bottomNav}>
        <BottomNavigationAction label="Menu" value="menu" icon={<MenuIcon fontSize="large" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>} />
        <BottomNavigationAction label="Search" value="search" onClick={()=> history.push("/searchApi")} icon={<SearchIcon fontSize="large" />} />
        <BottomNavigationAction label="Calendar" value="calendar" onClick={()=> history.push("/calendar")} icon={<TodayIcon fontSize="large" />} />
        <BottomNavigationAction label="Favorites" value="favorites" onClick={()=> history.push("/favorites")} icon={<FavoriteIcon fontSize="large" />} />
        <BottomNavigationAction label="Add New" value="addNew" onClick={()=> history.push("/newRecipe")} icon={<AddCircleOutlineIcon fontSize="large" />} />
        {/* <BottomNavigationAction label="Folder" value="folder" icon={<AccountCircleIcon fontSize="large" />} /> */}
      </BottomNavigation>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=>{handleClose(null)}}
        >
              <LogOutButton />
              <MenuItem onClick={()=> handleClose('newRecipe')}>Profile Page</MenuItem>
              <MenuItem onClick={()=> handleClose('searchApi')}>Calendar List</MenuItem>
              <MenuItem onClick={()=> handleClose('fullCalendar')}>Planned Meals</MenuItem>
      </Menu>
    </div>
  )
}

export default FooterNav;