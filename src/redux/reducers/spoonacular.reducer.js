import { combineReducers } from "redux";

const recipeSearchList = (state = [], action) => {
  if (action.type === "SET_SPOON_QUERY") {
    return action.payload;
  }
  return state;
};

const recipeIdDetails = (state = [], action) => {
  if (action.type === "SET_SPOON_ID") {
    return action.payload;
  }
  return state;
};

const spoonacularReducers = combineReducers({
    recipeSearchList,
    recipeIdDetails,
});

export default spoonacularReducers;