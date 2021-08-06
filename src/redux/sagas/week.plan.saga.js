import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* weekPlanSaga() {
    yield takeLatest('GET_WEEK_PLAN', getWeekPlan);
}

// worker Saga: will be fired on "FETCH_USER" actions
function* getWeekPlan() {
  try {
    const userMealPlan = yield axios.get('/api/mealPlan');
    yield put({type: 'SET_WEEK_PLAN', payload: userMealPlan.data});
  } catch (error) {
      console.log('Error GETting or SETting reducer', error);
  }
}



export default weekPlanSaga;
