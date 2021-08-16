// Changed how meals are posted.. this may no longer be relevant

const mealPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case "TEST_NEW_MEAL_PLAN":
      return action.payload;
    default:
      return state;
  }
};

export default mealPlanReducer;
