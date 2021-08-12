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


function FullCalendar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const weekPlan = useSelector(store => store.weekPlan);

    useEffect(()=>{
        dispatch({type: 'GET_WEEK_PLAN'})
    },[]);

    return (
        <div className='standardBackground'>
        <Grid container justifyContent="center" spacing={1}>
         {weekPlan[0] && weekPlan.map((meal, i) => {
            return(
                <Grid key={i} item xs={11} sm={7} md={7} lg={7}>
                    <Accordion onClick={() => history.push(`/recipe/${meal.recipe_id}`)}>
                        <AccordionSummary >
                        <Typography>{
                            new Date(meal.date).toDateString()} 
                            <ChevronRightIcon fontSize="small"/> 
                            {meal.category} 
                            <ChevronRightIcon fontSize="small"/>
                            {meal.name}</Typography>
                        </AccordionSummary>
                        {/* <AccordionDetails>
                          <img src={meal.picture} width="75px"/>
                        </AccordionDetails> */}
                    </Accordion>
                </Grid>
                
            )
         })}
         </Grid>

        </div>
    )
}


export default FullCalendar