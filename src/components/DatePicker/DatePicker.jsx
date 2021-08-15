import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

// imports for the date picker calendar
import "date-fns";
import LuxonUtils from "@date-io/luxon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function DatePicker({
  open,
  setOpen,
  recipeId,
  mealPlanId,
  calendar_id,
  mealCategory,
  isEdit,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((store) => store.categories);
  const calendars = useSelector((store) => store.calendars);

  useEffect(() => {
    dispatch({ type: "GET_CATEGORIES" });
    dispatch({ type: "GET_CALENDAR_LIST" });
  }, []);

  // selectedDate default value is current day.  Using getFullYear(), getMonth(), getDate()
  // to prevent useState value from being rounded up to the next day based on the hours
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );

  const [categoryState, setCategoryState] = useState("");
  const [calendarId, setCalendarId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePlanMeal = () => {
    dispatch({
      type: "SET_NEW_MEAL_PLAN",
      payload: {
        date: selectedDate,
        category: categoryState || categories[0].id,
        recipeId: recipeId,
        calendarId: calendarId || calendars[0].calendar_id,
      },
    });
    setOpen(false);
  };

  const handleEditMeal = () => {
    dispatch({
      type: "EDIT_MEAL_PLAN",
      payload: {
        date: selectedDate,
        category: categoryState || mealCategory,
        calendarId: calendarId || calendars[0].calendar_id,
        mealPlanId: mealPlanId,
      },
    });
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogContent>
        <Grid container direction="column">
          {calendars[0] && (
            <FormControl>
              <NativeSelect
                variant="filled"
                value={calendarId || calendars[0].calendar_id}
                onChange={(event) => setCalendarId(event.target.value)}
              >
                <option
                  key={calendars[0].calendar_id}
                  value={calendars[0].calendar_id}
                >
                  {calendars[0].name}
                </option>

                {/* {calendars && calendars.map(calendar => {
            return (
                <option key={calendar.calendar_id} value={calendar.calendar_id}>{calendar.name}</option>
            )
            })} */}
              </NativeSelect>
            </FormControl>
          )}
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Select Date"
              views={["year", "month", "date"]}
              value={selectedDate}
              format="MM/dd/yyyy"
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          {categories[0] && (
            <FormControl>
              <InputLabel>Select Category</InputLabel>
              <NativeSelect
                variant="filled"
                value={categoryState || categories[0].id}
                inputProps={{ "aria-label": "Without label" }}
                onChange={(event) => setCategoryState(event.target.value)}
              >
                {categories &&
                  categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    );
                  })}
              </NativeSelect>
            </FormControl>
          )}
          {isEdit ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditMeal}
            >
              Save Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePlanMeal}
            >
              Plan Meal
            </Button>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DatePicker;
