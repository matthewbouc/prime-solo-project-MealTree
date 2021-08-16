import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Button from "@material-ui/core/Button";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "../App/App.css";

const useStyles = makeStyles({
  calendarItem: {
    backgroundColor: "#ACC8AB",
    height: "50px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.2)",
  },
});

function CalendarList() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const calendars = useSelector((store) => store.calendars);
  const [addPersonDialog, setAddPersonDialog] = useState(false);
  const [deleteCalendarDialog, setDeleteCalendarDialog] = useState(false);
  const [defaultCalendarDialog, setDefaultCalendarDialog] = useState(false);
  const [calendarNameDialog, setCalendarNameDialog] = useState(false);

  const [calendarName, setCalendarName] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_CALENDAR_LIST" });
  }, []);

  const handleCloseDialog = (dialog) => {
    switch (dialog) {
      case "addPerson":
        setAddPersonDialog(false);
        break;
      case "deleteCalendar":
        setDeleteCalendarDialog(false);
        break;
      case "defaultCalendar":
        setDefaultCalendarDialog(false);
        break;
      case "calendarName":
        setCalendarNameDialog(false);
        break;
      default:
        alert("error closing dialog");
        break;
    }
  };
  const handleOpenDialog = (dialog) => {
    switch (dialog) {
      case "addPerson":
        setAddPersonDialog(true);
        break;
      case "deleteCalendar":
        setDeleteCalendarDialog(true);
        break;
      case "defaultCalendar":
        setDefaultCalendarDialog(true);
        break;
      case "calendarName":
        setCalendarNameDialog(true);
        break;
      default:
        alert("error closing dialog");
        break;
    }
  };

  const handleClickAddPersonIcon = (calendarName, calendarId) => {
    setCalendarName(calendarName);
    setCalendarId(calendarId);
    handleOpenDialog("addPerson");
  };

  const handleClickTrashIcon = (calendarName, calendarId) => {
    setCalendarName(calendarName);
    setCalendarId(calendarId);
    handleOpenDialog("deleteCalendar");
  };
  // Uses Dialog to confirm changing the default calendar
  const handleNewDefaultCalendar = (calendarId) => {
    setCalendarId(calendarId);
    dispatch({ type: "SET_NEW_DEFAULT", payload: calendarId }); // Not required if using Dialog
    // handleOpenDialog('defaultCalendar'); //Uses Dialog Option
  };
  // NOT CURRENTLY IN USE - Linked to handleNewDefaultCalendar and Dialog option
  const handleSetDefaultCalendar = () => {
    dispatch({ type: "SET_NEW_DEFAULT", payload: calendarId });
    handleCloseDialog("defaultCalendar");
  };

  const handleDeleteCalendar = () => {
    dispatch({ type: "DELETE_CALENDAR", payload: calendarId });
    handleCloseDialog("deleteCalendar");
  };

  const handleAddUsername = () => {
    dispatch({
      type: "ADD_USER_TO_CALENDAR",
      payload: { username, calendarId },
    });
    handleCloseDialog("addPerson");
    setUsername("");
  };

  const handleChangeCalendarName = (calendarId) => {
    setCalendarName("");
    setCalendarId(calendarId);
    handleOpenDialog("calendarName");
  };

  const updateCalendarName = () => {
    dispatch({
      type: "UPDATE_CALENDAR_NAME",
      payload: {
        id: calendarId,
        name: calendarName,
      },
    });
    handleCloseDialog("calendarName");
    setCalendarName("");
  };

  return (
    <div className='standardBackground'>
      <Grid container justifyContent='center'>
        <Typography variant='h6'>All Calendars</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <AddCircleOutlinedIcon
            color='secondary'
            fontSize='large'
            style={{ marginBottom: "10px" }}
            onClick={() => dispatch({ type: "CREATE_NEW_CALENDAR" })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent='center'>
        {calendars.map((calendar, i) => {
          return (
            <Grid
              key={i}
              item
              xs={10}
              container
              className={classes.calendarItem}
              alignContent='center'
              justifyContent='center'
            >
              <Grid item xs={1}>
                {(calendar.default_calendar && <CheckBoxOutlinedIcon />) || (
                  <CheckBoxOutlineBlankIcon
                    onClick={() =>
                      handleNewDefaultCalendar(calendar.calendar_id)
                    }
                  />
                )}
              </Grid>
              <Grid
                item
                xs={7}
                onClick={() => handleChangeCalendarName(calendar.calendar_id)}
              >
                <Typography>{calendar.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <GroupAddIcon
                  onClick={() =>
                    handleClickAddPersonIcon(
                      calendar.name,
                      calendar.calendar_id
                    )
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <DeleteIcon
                  onClick={() =>
                    handleClickTrashIcon(calendar.name, calendar.calendar_id)
                  }
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      {/* Add user Dialog */}
      <Dialog
        onClose={() => handleCloseDialog("addPerson")}
        open={addPersonDialog}
      >
        <DialogTitle onClick={()=>setUsername('morganrose')}>
          Add A Friend To <br /> {calendarName}
        </DialogTitle>
        <DialogContent>
          <TextField
            label='Username'
            value={username}
            variant='filled'
            onChange={(event) => setUsername(event.target.value)}
          ></TextField>
          <br />
          <br />
          <Button
            onClick={handleAddUsername}
            variant='contained'
            color='primary'
          >
            Add User
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete calendar Dialog */}
      <Dialog
        onClose={() => handleCloseDialog("deleteCalendar")}
        open={deleteCalendarDialog}
      >
        <DialogTitle>Delete {calendarName}?</DialogTitle>
        <DialogContent>
          <Typography>
            Deleting a calendar is permanent and cannot be undone.
          </Typography>
          <Button
            onClick={() => handleCloseDialog("deleteCalendar")}
            variant='contained'
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCalendar}
            variant='contained'
            style={{ backgroundColor: "red" }}
          >
            DELETE
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => handleCloseDialog("defaultCalendar")}
        open={defaultCalendarDialog}
      >
        <DialogTitle>Change Primary Calendar?</DialogTitle>
        <DialogContent>
          <Typography>
            This will change the calendar you see on your home page.
          </Typography>
          <Button
            onClick={() => handleCloseDialog("defaultCalendar")}
            variant='contained'
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSetDefaultCalendar}
            variant='contained'
            color='secondary'
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => handleCloseDialog("calendarName")}
        open={calendarNameDialog}
      >
        <DialogTitle onClick={()=> setCalendarName('Labor Day Weekend')}>Change Calendar Name?</DialogTitle>
        <DialogContent>
          <TextField
            variant='filled'
            label='Calendar Name'
            style={{ width: "250px" }}
            value={calendarName}
            onChange={(event) => setCalendarName(event.target.value)}
          />
          <br />
          <br />
          <Button
            onClick={() => handleCloseDialog("calendarName")}
            variant='contained'
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={updateCalendarName}
            variant='contained'
            color='secondary'
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CalendarList;
