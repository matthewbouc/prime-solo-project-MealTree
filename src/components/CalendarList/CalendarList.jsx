import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App/App.css';


import { Grid, Button, Typography, Dialog, DialogTitle, DialogContent, TextField } from "@material-ui/core"
import GroupAddIcon from '@material-ui/icons/GroupAdd';

function CalendarList () {
    const history = useHistory();
    const dispatch = useDispatch();

    const calendars = useSelector(store => store.calendars);
    const [editPerson, setEditPerson] = useState(false);
    const [calendarName, setCalendarName] = useState('');
    const [addUsername, setAddUsername] = useState('');

    useEffect(()=>{
        dispatch({type: 'GET_CALENDAR_LIST'})
    },[])

    const handleClosePerson = () => {
        setEditPerson(false);
    };
    const handleOpenPerson = () => {
        setEditPerson(true);
    };

    const handleAddPersonIcon = (calendarName) => {
        setCalendarName(calendarName);
        handleOpenPerson();
    }

    const handleAddUsername = () => {
        dispatch({})
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
                    <GroupAddIcon onClick={() => handleAddPersonIcon(calendar.name)}/>
                </Grid>
            </Grid>
            )
        })}
        </Grid>



        <Dialog onClose={handleClosePerson} open={editPerson}>
            <DialogTitle>
                Add A Friend To: <br/> {calendarName}
            </DialogTitle>
            <DialogContent>
                <TextField label="Username" value={addUsername} variant="filled" onChange={(event) => setAddUsername(event.target.value)}></TextField>
                <br/><br/>
                <Button onClick={handleAddUsername} variant="contained" color="primary">Add User</Button>
            </DialogContent>
        </Dialog>





        </div>

    )
}

export default CalendarList