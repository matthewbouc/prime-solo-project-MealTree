const weekPlanReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WEEK_PLAN':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default weekPlanReducer;