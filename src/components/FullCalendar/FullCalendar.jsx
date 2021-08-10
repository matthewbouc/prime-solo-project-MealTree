import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


function FullCalendar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const weekPlan = useSelector((store) => store.weekPlan);


    return (
        <p>HELLO WORLD</p>
    )
}


export default FullCalendar