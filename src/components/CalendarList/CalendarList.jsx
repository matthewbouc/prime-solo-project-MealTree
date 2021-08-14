import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';



import { Typography } from "@material-ui/core"

function CalendarList () {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: 'GET_CALENDAR_LIST'})
    },[])

    return(
        <div className='standardBackground'>
        <Typography>CalendarList here</Typography>
        </div>
    )
}

export default CalendarList