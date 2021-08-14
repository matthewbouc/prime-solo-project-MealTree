import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* calendarSaga() {
    yield takeLatest('GET_CALENDAR_LIST', getCalendars);
    yield takeLatest('CREATE_NEW_CALENDAR', createCalendar);
}

function* createCalendar() {
    try {
        yield axios.post('/api/calendar');
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch(error){
        console.log('Error creating new calendar', error);
    }
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