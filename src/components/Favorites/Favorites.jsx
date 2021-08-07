import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
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

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
      <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              views={['year', 'month', 'date']}
              value={selectedDate}
              format="dd/MM/yyyy"
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
      </Grid>
    </MuiPickersUtilsProvider>
{/* 
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </Dialog> */}
  </div>
  );
}

export default Favorites;
