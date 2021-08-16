import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* favoritesSaga() {
  yield takeLatest("GET_FAVORITES_LIST", getFavorites);
  yield takeEvery("GET_CATEGORIES", getCategories);
}

// worker Saga: will be fired on "FETCH_USER" actions
function* getFavorites() {
  try {
    const favoritesList = yield axios.get("/api/recipes");
    yield put({ type: "SET_FAVORITES_LIST", payload: favoritesList.data });
  } catch (error) {
    console.log("Error GETting or SETting reducer", error);
  }
}

function* getCategories() {
  try {
    const categories = yield axios.get("/api/mealPlan/categories");
    yield put({ type: "SET_CATEGORIES", payload: categories.data });
  } catch (error) {
    console.log("Error GETting categories", error);
  }
}

export default favoritesSaga;
