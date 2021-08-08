import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'date-fns';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favoritesList);
  const categories = useSelector(store => store.categories);
  const calendars = useSelector(store => store.calendars);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryState, setCategoryState] = useState(categories[0].id);
  const [recipeId, setRecipeId] = useState('');
  const [calendarId, setCalendarId] = useState(calendars[0].calendar_id);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch({type: 'GET_CATEGORIES'});
    dispatch({type: 'GET_FAVORITES_LIST'});
    dispatch({type: 'GET_CALENDAR_LIST'});
  }, [])
  

  const handleClickOpen = () => {
  setOpen(true);
  };

  const handleClose = () => {
  setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handlePlanIt = (id) => {
    event.stopPropagation();
    handleClickOpen();
    setRecipeId(id);
  }

  const handleViewRecipe = (event) => {
    event.stopPropagation();
  }

  const handlePlanMeal = () => {
    console.log('selectedDate', selectedDate);
    console.log('categoryState', categoryState);
    dispatch({type: 'SET_NEW_MEAL_PLAN', payload: {
      date: selectedDate,
      category: categoryState,
      recipeId: recipeId,
      calendarId: calendarId,
    }})
  }
  
  return (
    <div>
    {favorites && favorites.map((recipe, i) => {     
      return(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography>{recipe.name}</Typography>
            <img src={recipe.picture} width="100px"/>
            <Button
            onClick={() => handlePlanIt(recipe.id)}
            onFocus={handleViewRecipe}
            >Plan It</Button>
            <Button
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
              >View Recipe</Button>
          </AccordionSummary>
          <AccordionDetails>
              {recipe.ingredients}
          </AccordionDetails>
        </Accordion>
      )
    })}



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
  </div>
  );
}

export default Favorites;
