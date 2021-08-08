const mealPlanReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_NEW_MEAL_PLAN':
        return action.payload;
      default:
        return state;
    }
}

export default mealPlanReducer;