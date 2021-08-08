import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favoritesList);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
  setOpen(true);
  };

  const handleClose = () => {
  setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(()=>{
    dispatch({type: 'GET_FAVORITES_LIST'})
  },[])

  const handlePlanIt = (event) => {
    event.stopPropagation();
    handleClickOpen();
  }

  const handleViewRecipe = (event) => {
    event.stopPropagation();
   
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
            onClick={handlePlanIt}
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
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Add Meal To Date"
          views={['year', 'month', 'date']}
          value={selectedDate}
          format="MM/dd/yyyy"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Button >Plan Meal</Button>
    </Dialog>
  </div>
  );
}

export default Favorites;
