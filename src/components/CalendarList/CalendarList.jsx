import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App/App.css';


import { Grid, Button, Typography, Dialog, DialogTitle, DialogContent, TextField, makeStyles } from "@material-ui/core"
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

const useStyles = makeStyles({
    calendarItem: {
        backgroundColor: '#ACC8AB',
        height: '50px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
    },
})

function CalendarList () {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const calendars = useSelector(store => store.calendars);
    const [addPersonDialog, setAddPersonDialog] = useState(false);
    const [deleteCalendarDialog, setDeleteCalendarDialog] = useState(false);
    const [defaultCalendarDialog, setDefaultCalendarDialog] = useState(false);
    const [calendarName, setCalendarName] = useState('');
    const [calendarId, setCalendarId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(()=>{
        dispatch({type: 'GET_CALENDAR_LIST'})
    },[])

    const handleCloseDialog = (dialog) => {
        switch (dialog) {
            case 'addPerson':
                setAddPersonDialog(false);
                break;
            case 'deleteCalendar':
                setDeleteCalendarDialog(false);
                break;
            case 'defaultCalendar':
                setDefaultCalendarDialog(false);
                break;
            default:
                alert('error closing dialog')
                break;
        }
    };
    const handleOpenDialog = (dialog) => {
        switch (dialog) {
            case 'addPerson':
                setAddPersonDialog(true);
                break;
            case 'deleteCalendar':
                setDeleteCalendarDialog(true);
                break;
            case 'defaultCalendar':
                setDefaultCalendarDialog(true);
                break;
            default:
                alert('error closing dialog')
                break;
        }
    };

    const handleClickAddPersonIcon = (calendarName, calendarId) => {
        setCalendarName(calendarName);
        setCalendarId(calendarId);
        handleOpenDialog('addPerson');
    }

    const handleClickTrashIcon = (calendarName, calendarId) => {
        setCalendarName(calendarName);
        setCalendarId(calendarId);
        handleOpenDialog('deleteCalendar');
    }

    const handleNewDefaultCalendar = (calendarId) => {
        setCalendarId(calendarId);
        handleOpenDialog('defaultCalendar');
    }

    const handleSetDefaultCalendar = () => {
        dispatch({type: 'SET_NEW_DEFAULT', payload: calendarId})
        handleCloseDialog('defaultCalendar')
    }

    const handleDeleteCalendar = () => {
        dispatch({type: 'DELETE_CALENDAR', payload: calendarId})
        handleCloseDialog('deleteCalendar');
    }

    const handleAddUsername = () => {
        dispatch({type: 'ADD_USER_TO_CALENDAR', payload: {username, calendarId}})
        handleCloseDialog('addPerson');
        setUsername('');
    }

    return(
        <div className='standardBackground'>
        <Grid container justifyContent="center">
        <Typography variant="h6">All Calendars</Typography>
        </Grid>
        <Grid container>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
        <AddCircleOutlinedIcon color="secondary" fontSize="large" style={{marginBottom: '10px'}} onClick={()=>dispatch({type: 'CREATE_NEW_CALENDAR'})}/>
        </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center">
        {calendars.map((calendar, i) => {
            return(
            <Grid key={i} item xs={10} container className={classes.calendarItem} alignContent="center" justifyContent="center">
                <Grid item xs={2}>
                {calendar.default_calendar && <CheckBoxOutlinedIcon /> || <CheckBoxOutlineBlankIcon onClick={() => handleNewDefaultCalendar(calendar.calendar_id)}/>}
                </Grid>
                <Grid item xs={6}>
                <Typography>{calendar.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <GroupAddIcon onClick={() => handleClickAddPersonIcon(calendar.name, calendar.calendar_id)}/>
                </Grid>
                <Grid item xs={2}>
                    <DeleteIcon onClick={() => handleClickTrashIcon(calendar.name, calendar.calendar_id)} />
                </Grid>
            </Grid>
            )
        })}
        </Grid>


        {/* Add user Dialog */}
        <Dialog onClose={()=>handleCloseDialog('addPerson')} open={addPersonDialog}>
            <DialogTitle>
                Add A Friend To: <br/> {calendarName}
            </DialogTitle>
            <DialogContent>
                <TextField label="Username" value={username} variant="filled" onChange={(event) => setUsername(event.target.value)}></TextField>
                <br/><br/>
                <Button onClick={handleAddUsername} variant="contained" color="primary">Add User</Button>
            </DialogContent>
        </Dialog>


        {/* Delete calendar Dialog */}
        <Dialog onClose={()=>handleCloseDialog('deleteCalendar')} open={deleteCalendarDialog}>
            <DialogTitle>
                Delete {calendarName}?
            </DialogTitle>
            <DialogContent>
                <Typography>Deleting a calendar is permanent and cannot be undone.</Typography>
                <Button onClick={()=>handleCloseDialog('deleteCalendar')} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleDeleteCalendar} variant="contained" style={{backgroundColor: 'red'}}>DELETE</Button>
            </DialogContent>
        </Dialog>

        <Dialog onClose={()=>handleCloseDialog('defaultCalendar')} open={defaultCalendarDialog}>
            <DialogTitle>
                Change Primary Calendar?
            </DialogTitle>
            <DialogContent>
                <Typography>This will change the calendar you see on your home page.</Typography>
                <Button onClick={()=>handleCloseDialog('defaultCalendar')} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleSetDefaultCalendar} variant="contained" color="secondary">Update</Button>

            </DialogContent>
        </Dialog>


        </div>

    )
}

export default CalendarList