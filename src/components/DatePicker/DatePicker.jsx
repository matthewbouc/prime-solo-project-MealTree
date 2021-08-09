import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'date-fns';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';

function DatePicker({open, setOpen, recipeId}) {

    const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector(store => store.categories);
  const calendars = useSelector(store => store.calendars);

  useEffect(() => {
    dispatch({type: 'GET_CATEGORIES'});
    dispatch({type: 'GET_CALENDAR_LIST'});
  }, [])

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryState, setCategoryState] = useState('');
  const [calendarId, setCalendarId] = useState('');
  
  const handleClose = () => {
  setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePlanMeal = () => {
    dispatch({type: 'SET_NEW_MEAL_PLAN', payload: {
      date: selectedDate,
      category: categoryState || categories[0].id,
      recipeId: recipeId,
      calendarId: calendarId || calendars[0].calendar_id,
    }})
    setOpen(false);
  }

  return(

    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle>
        <select onChange={event => setCalendarId(event.target.value)}>
            {calendars && calendars.map(calendar => {
            return (
                <option key={calendar.calendar_id} value={calendar.calendar_id}>{calendar.name}</option>
            )
            })}
        </select></DialogTitle>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select Date"
            views={['year', 'month', 'date']}
            value={selectedDate}
            format="MM/dd/yyyy"
            onChange={handleDateChange}
            KeyboardButtonProps={{
            'aria-label': 'change date',
            }}
        />
        </MuiPickersUtilsProvider>
        <select onChange={event => setCategoryState(event.target.value)}>
        {categories && categories.map(category => {
            return (
            <option key={category.id} value={category.id}>{category.category}</option>
            )
        })}
        </select>
        <Button onClick={handlePlanMeal}>Plan Meal</Button>
    </Dialog>
  )
}

export default DatePicker