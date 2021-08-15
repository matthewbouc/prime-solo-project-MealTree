import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* weekPlanSaga() {
  yield takeLatest("GET_WEEK_PLAN", getWeekPlan);
  yield takeEvery("DELETE_MEAL_PLAN", deleteMealPlan);
  yield takeLatest("SET_NEW_MEAL_PLAN", postMealPlan);
  yield takeLatest("EDIT_MEAL_PLAN", editMealPlan);
}

function* deleteMealPlan(action) {
  const mealPlanId = action.payload.mealPlanId;
  const calendarId = action.payload.calendarId;
  try {
    yield call(
      axios.delete,
      `/api/mealPlan?mealPlan=${mealPlanId}&calendarId=${calendarId}`
    );
    yield put({ type: "GET_WEEK_PLAN" });
  } catch (error) {
    console.log("Error DELETing mealPlan", error);
  }
}

// worker Saga: will be fired on "FETCH_USER" actions
function* getWeekPlan() {
  try {
    const userMealPlan = yield axios.get("/api/mealPlan");
    yield put({ type: "SET_WEEK_PLAN", payload: userMealPlan.data });
  } catch (error) {
    console.log("Error GETting or SETting reducer", error);
  }
}

// POST new meal plan
function* postMealPlan(action) {
  try {
    yield call(axios.post, `/api/mealPlan`, action.payload);
  } catch (error) {
    console.log("Error POSTing new meal plan", error);
  }
}

function* editMealPlan(action) {
  try {
    yield call(axios.put, "/api/mealPlan", action.payload);
    yield put({ type: "GET_WEEK_PLAN" });
  } catch (error) {
    console.log("Error PUTting edits to meal plan", error);
  }
}

export default weekPlanSaga;
