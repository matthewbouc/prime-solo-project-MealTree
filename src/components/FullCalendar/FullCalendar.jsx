import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../App/App.css";

function FullCalendar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const weekPlan = useSelector((store) => store.weekPlan);
  const calendar = useSelector((store) => store.calendars[0]);

  useEffect(() => {
    dispatch({ type: "GET_WEEK_PLAN" });
  }, []);

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

  // NO longer using accordion functionality, should be switched out to just plain Grid styling like CalendarList.jsx
  return (
    <div className="standardBackground">
      <Grid container justifyContent="center">
        <Typography variant="h6">{calendar.name} History</Typography>
      </Grid>
      <Grid container justifyContent="center" spacing={1}>
        {weekPlan[0] &&
          weekPlan.map((meal, i) => {
            return (
              <Grid key={i} item xs={11} sm={7} md={7} lg={7}>
              {/* Get rid of accordion and go Grid */}
                <Accordion
                  onClick={(event) => handleViewRecipe(event, meal.recipe_id, meal.api_id)}
                  style={{ backgroundColor: "#ACC8AB" }}
                >
                  <AccordionSummary>
                    <Grid container>
                      <Grid item container>
                        <Grid item xs={5}>
                          <Typography>
                            {new Date(meal.date).toDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <ChevronRightIcon fontSize="small" />
                        </Grid>
                        <Grid item xs={5}>
                          <Typography>{meal.category}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item container>
                        <Typography style={{ fontWeight: "600" }}>
                          {meal.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                </Accordion>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default FullCalendar;
