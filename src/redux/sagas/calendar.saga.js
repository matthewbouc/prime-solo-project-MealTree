import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* calendarSaga() {
    yield takeLatest('GET_CALENDAR_LIST', getCalendars);
}

function* getCalendars() {
    try {
      const calendarList = yield axios.get('/api/calendar/all');
      yield put({type: 'SET_CALENDAR_LIST', payload: calendarList.data});
    } catch (error) {
        console.log('Error setting calendar reducer', error);
    }
}

export default calendarSaga