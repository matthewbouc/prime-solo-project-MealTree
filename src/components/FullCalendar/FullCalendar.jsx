import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import DatePicker from '../DatePicker/DatePicker';
import { Card, Grid, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../App/App.css';
import calendarSaga from '../../redux/sagas/calendar.saga';


function FullCalendar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const weekPlan = useSelector(store => store.weekPlan);
    const calendar = useSelector(store => store.calendars[0])

    useEffect(()=>{
        dispatch({type: 'GET_WEEK_PLAN'})
    },[]);

    // NO longer using accordion functionality, should be switched out to just plain Grid styling like CalendarList.jsx
    return (
        <div className='standardBackground'>
        <Grid container justifyContent="center">
            <Typography variant="h6">{calendar.name} Full Calendar</Typography>
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
         {weekPlan[0] && weekPlan.map((meal, i) => {
            return(
                <Grid key={i} item xs={11} sm={7} md={7} lg={7}>
                    <Accordion onClick={() => history.push(`/recipe/${meal.recipe_id}`)} style={{backgroundColor: "#ACC8AB"}}>
                        <AccordionSummary >
                        <Grid container>
                            <Grid item container>
                            <Grid item xs={5}>
                            <Typography>{new Date(meal.date).toDateString()}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                            <ChevronRightIcon fontSize="small"/> 
                            </Grid>
                            <Grid item xs={5}>
                            <Typography>{meal.category}</Typography>
                            </Grid>
                            </Grid>
                            <Grid item container>
                            <Typography style={{fontWeight: '600'}}>{meal.name}</Typography>
                            </Grid>
                            </Grid>
                        </AccordionSummary>
                    </Accordion>
                </Grid>
                
            )
         })}
         </Grid>

        </div>
    )
}


export default FullCalendar