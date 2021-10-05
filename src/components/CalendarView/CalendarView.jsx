import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "../DatePicker/DatePicker";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from '@material-ui/core/Box/Box'
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../App/App.css";

function CalendarView() {
  const history = useHistory();
  const dispatch = useDispatch();

  const weekPlan = useSelector((store) => store.weekPlan);
  const calendars = useSelector((store) => store.calendars);



  // *** DATE FUNCTIONALITY *** // 
  // Uses new Date() to allow the calendar view to include and display today + 7 more days  Sunday->Sunday, Monday->Monday, etc.
  const [nextDays, setNextDays] = useState([]);
  const [nextDates, setNextDates] = useState([]);

  const currentTime = new Date();
  //this array is used to return string value for day of week
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    createWeek();
    dispatch({ type: "GET_WEEK_PLAN" });
    dispatch({ type: "GET_CALENDAR_LIST" });
  }, []);
  // determines the date of the month and the day of the week, then creates arrays containing today plus the next 7 days.
  const createWeek = () => {
    const dayArray = [];
    const dateArray = [];
    for (let i = 0; i < 8; i++) {
      const dateOfDay = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() + i
      );
      dayArray.push(dateOfDay.getDay());
      dateArray.push(dateOfDay);
    }
    setNextDays(dayArray);
    setNextDates(dateArray);
  };
  // *** END OF DATE FUNCTIONALITY **** //


  const handleDeleteRecipe = (mealPlanId, calendarId) => {
    dispatch({ type: "DELETE_MEAL_PLAN", payload: { mealPlanId, calendarId } });
  };

  const [mealPlanId, setMealPlanId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // Opens DatePicker
  const handleClickOpen = () => {
    setOpen(true);
  };
  // opens date picker with edit functionality (opposed to POST functionality).  isEdit and mealId passed down as props.
  const handleEdit = (mealId) => {
    setIsEdit(true);
    setMealPlanId(mealId);
    handleClickOpen();
  };

  // recipeDisplay is mapped inside of the nextDates map (which creates accordion buttons)
  // recipeDisplay takes in the accordion date and compares it to each meal in weekPlan reducer.
  // if dates are the same push it to a temp array.  return the dateMealArray so it can be mapped inside the AccordionDetails
  const recipeDisplay = (accordionDate) => {
    const dateMealArray = [];
    for (const meal of weekPlan) {
      let newFormat = new Date(meal.date);
      if (newFormat.valueOf() == accordionDate.valueOf()) {
        dateMealArray.push(meal);
      }
    }
    return dateMealArray;
  };

  // dispatches to get/set recipe details.  dispatch pushes the user to the recipe details page.
  const handleViewRecipe = (event, id, apiId) => {
    event.stopPropagation();
    dispatch({
      type: "GET_RECIPE_DETAILS",
      payload: {
        id: id,
        api_id: apiId
      },
      push: history.push,
      isFavorites: true,
    });
  };

  return (
    <div className="standardBackground">
      <Grid container justifyContent="center">
        {calendars[0] && (
          <Typography variant="h6">{calendars[0].name}</Typography>
        )}
      </Grid>
  {/* Map through the week and make an accordion button for each day (8 total) */}
      <Grid container justifyContent="center" spacing={1}>
        {nextDates &&
          nextDates.map((date, i) => {
            return (
              <Grid key={i} item xs={11} sm={7} md={7} lg={7}>
                <Accordion elevation={8} style={{ backgroundColor: "#ACC8AB" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand" aria-controls="additional-actions1-content" id="additional-actions1-header">
                    <Typography>
                      {date.getDate()} {weekDays[nextDays[i]]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
  {/* Map through the weekPlan reducer and match recipes between nextDates and weekPlan. Display any matching recipes. */}
                    <Box display="flex" flexWrap="wrap">
                      {weekPlan &&
                        recipeDisplay(date).map((meal) => {
                          return (
                            <Grid key={meal.id} container style={{ marginBottom: "5px" }} justifyContent="center" >
                              <Grid item xs={4}>
                                <img src={meal.picture} onClick={(event) => handleViewRecipe(event, meal.recipe_id, meal.api_id)} width="100px" />
                              </Grid>
                              <Grid item xs={5} container alignContent="center" style={{ paddingRight: "8px" }} >
                                <Grid item>
                                  <Typography style={{ fontWeight: "600" }}>
                                    {meal.category}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography onClick={() => history.push(`/recipe/${meal.recipe_id}`)} >
                                    {meal.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={3} container alignContent="center">
                                <Grid item>
                                  <Button variant="contained" color="secondary" style={{ marginBottom: "5px" }} onClick={() => handleEdit(meal.id)}>
                                    Edit
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Button variant="contained" color="secondary" onClick={() => handleDeleteRecipe(meal.id, meal.calendar_id)}>
                                    <DeleteIcon />
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
  {/* DatePicker allows user to edit their planned meal selections */}
        <DatePicker open={open} setOpen={setOpen} mealPlanId={mealPlanId} isEdit={isEdit} />
      </Grid>
    </div>
  );
}

export default CalendarView;
