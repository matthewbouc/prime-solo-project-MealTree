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
import DatePicker from '../DatePicker/DatePicker';

import 'date-fns';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';


function Favorites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector(store => store.favoritesList);
  const categories = useSelector(store => store.categories);
  const calendars = useSelector(store => store.calendars);

  useEffect(() => {
    dispatch({type: 'GET_CATEGORIES'});
    dispatch({type: 'GET_FAVORITES_LIST'});
    dispatch({type: 'GET_CALENDAR_LIST'});
  }, [])

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryState, setCategoryState] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [calendarId, setCalendarId] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
  setOpen(true);
  };

  // const handleClose = () => {
  // setOpen(false);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };


  const handlePlanIt = (event, id) => {
    event.stopPropagation();
    handleClickOpen();
    setRecipeId(id);
  }

  const handleViewRecipe = (event, id) => {
    event.stopPropagation();
    dispatch({ type: 'SET_RECIPE_DETAILS', payload: {}});
    history.push(`/recipe/${id}`);
  }

  // const handlePlanMeal = () => {
  //   dispatch({type: 'SET_NEW_MEAL_PLAN', payload: {
  //     date: selectedDate,
  //     category: categoryState || categories[0].id,
  //     recipeId: recipeId,
  //     calendarId: calendarId || calendars[0].calendar_id,
  //   }})
  // }
  
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
            onClick={(event) => handlePlanIt(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
            >Plan It</Button>
            <Button
            onClick={(event) => handleViewRecipe(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
              >View Recipe</Button>
          </AccordionSummary>
          <AccordionDetails>
              {recipe.ingredients}
          </AccordionDetails>
        </Accordion>
      )
    })}

    <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
  </div>
  );
}

export default Favorites;
