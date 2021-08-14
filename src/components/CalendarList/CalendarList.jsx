import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App/App.css';


import { Grid, Button, Typography, Dialog, DialogTitle, DialogContent, TextField } from "@material-ui/core"
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';

function CalendarList () {
    const history = useHistory();
    const dispatch = useDispatch();

    const calendars = useSelector(store => store.calendars);
    const [addPersonDialog, setAddPersonDialog] = useState(false);
    const [deleteCalendarDialog, setDeleteCalendarDialog] = useState(false);
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

    const handleTrashIcon = (calendarName, calendarId) => {
        setCalendarName(calendarName);
        setCalendarId(calendarId);
        handleOpenDialog('deleteCalendar');
    }

    const handleDeleteCalendar = () => {
        dispatch({type: 'DELETE_CALENDAR', payload: calendarId})
    }

    const handleAddUsername = () => {
        dispatch({type: 'ADD_USER_TO_CALENDAR', payload: {username, calendarId}})
        handleCloseDialog();
        setUsername('');
    }

    return(
        <div className='standardBackground'>
        <Typography>CalendarList here</Typography>
        <Button variant="contained" color="secondary" onClick={()=>dispatch({type: 'CREATE_NEW_CALENDAR'})}>Plus Icon</Button>
        <Grid container justifyContent="center">
        {calendars.map((calendar, i) => {
            return(
            <Grid key={i} item xs={10} container style={{backgroundColor: 'white', height: '50px'}} alignContent="center" justifyContent="center">
                <Grid item>
                <Typography>{calendar.name}</Typography>
                </Grid>
                <Grid item>
                    <GroupAddIcon onClick={() => handleClickAddPersonIcon(calendar.name, calendar.calendar_id)}/>
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
                Are you sure you want to DELETE: {calendarName}
            </DialogTitle>
            <DialogContent>
                <Typography>Deleting a calendar is permanent and cannot be undone.</Typography>
                <Button onClick={()=>handleCloseDialog('deleteCalendar')} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleDeleteCalendar} variant="contained" style={{backgroundColor: 'red'}}>DELETE</Button>
            </DialogContent>
        </Dialog>



        </div>

    )
}

export default CalendarList