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
import { FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core';

function DatePicker({open, setOpen, recipeId, mealPlanId, calendar_id, mealCategory, isEdit}) {

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

  const handleEditMeal = () => {
    dispatch({type:'EDIT_MEAL_PLAN', payload: {
      date: selectedDate,
      category: categoryState || mealCategory,
      calendarId: calendar_id,
      mealPlanId: mealPlanId
    }});
    setOpen(false);
  }

  return(

    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
  {/* MAYBE GO BACK TO NATIVE SELECT  */}
        {calendars[0] && <FormControl>
          <NativeSelect 
          value={calendarId || calendars[0].name}
          onChange={event => setCalendarId(event.target.value)}>
            {calendars && calendars.map(calendar => {
            return (
                <option key={calendar.calendar_id} value={calendar.calendar_id}>{calendar.name}</option>
            )
            })}
        </NativeSelect>
        </FormControl>}
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
        <FormControl>
        <InputLabel>Select Category</InputLabel>
{/* FIX THIS SELECT DOWN HERE.. NOT DISPLAYING PROPERLY */}
        <NativeSelect 
        value="Category"
        inputProps={{ 'aria-label': 'Without label' }} 
        onChange={event => setCategoryState(event.target.value)}>
            <option value="" disabled>Category</option>
        {categories && categories.map(category => {
            return (
            <option key={category.id} value={category.id}>{category.category}</option>
            )
        })}
        </NativeSelect>
        </FormControl>
        {isEdit ? <>
          <Button variant="contained" color="primary" onClick={handleEditMeal}>Edit Meal</Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteRecipe(meal.id, meal.calendar_id)}>Delete Icon</Button> </>
        : 
          <Button onClick={handlePlanMeal}>Plan Meal</Button>}

    </Dialog>
  )
}

export default DatePicker