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


function CalendarView() {
  const history = useHistory();
  const dispatch = useDispatch();
  const weekPlan = useSelector((store) => store.weekPlan);
  const currentTime= new Date();
  const [nextDays, setNextDays] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  useEffect(()=>{
    createWeek();
    dispatch({type: 'GET_WEEK_PLAN'})
  },[])

  const createWeek = () => {
    const dayArray = [];
    const dateArray = [];
    for (let i=0; i<8; i++){
      const dateOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()+i);
      dayArray.push(dateOfDay.getDay());
      dateArray.push(dateOfDay);
    }
    setNextDays(dayArray);
    setNextDates(dateArray);
  }


  const handleDeleteRecipe = (mealPlanId, calendarId) => {
    dispatch({type: 'DELETE_MEAL_PLAN', payload: {mealPlanId, calendarId}})
  }


  const [mealPlanId, setMealPlanId] = useState('');
  const [calendar_id, setCalendar_id] = useState('');
  const [mealCategory, setMealCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleClickOpen = () => {
  setOpen(true);
  };
  const handleEdit = (mealId, calendarId, category) => {
    setIsEdit(true);
    setMealPlanId(mealId);
    setCalendar_id(calendarId);
    setMealCategory(category)
    handleClickOpen();
  }

  const recipeDisplay = (accordionDate) => {
    const dateMealArray = []
    // console.log('recipe display accordion date', accordionDate);
    for (const meal of weekPlan){
      let newFormat = new Date(meal.date);
      // console.log('meal.date', newFormat, accordionDate);
      if (newFormat.valueOf() == accordionDate.valueOf()){
        dateMealArray.push(meal);
      }
    }
    return dateMealArray
  }

  return (
    <div>
      {nextDates && nextDates.map((date, i) => {     
        return(
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Typography>{date.getDate()} {weekDays[nextDays[i]]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {weekPlan && recipeDisplay(date).map(meal=>{
                return (
                  <div key={meal.id}>
                  <p>{meal.category}</p>
                  <p>{meal.name}</p>
                  <img onClick={()=>history.push(`/recipe/${meal.recipe_id}`)} src={meal.picture} width="150px"/>
                  <Button variant="contained" onClick={() => handleEdit(meal.id, meal.calendar_id, meal.category)}>Edit</Button>
                  <Button variant="contained" onClick={() => handleDeleteRecipe(meal.id, meal.calendar_id)}>Delete Icon</Button>
                  </div>
                )
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}

      <DatePicker open={open} setOpen={setOpen} calendar_id={calendar_id} mealPlanId={mealPlanId} isEdit={isEdit}/>
    </div>
  );
}

export default CalendarView;

// pass down calendarId from calendar view for Edit
// reference calendarId prop in Date picker as the value that gets
// sent to server, then checked against server.
