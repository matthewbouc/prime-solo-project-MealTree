import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* calendarSaga() {
    yield takeLatest('GET_CALENDAR_LIST', getCalendars);
    yield takeLatest('CREATE_NEW_CALENDAR', createCalendar);
    yield takeLatest('ADD_USER_TO_CALENDAR', addUserCalendar);
    yield takeEvery('DELETE_CALENDAR', deleteCalendar);
}

function* addUserCalendar(action) {
    try{
        console.log(action.payload);
        yield axios.post(`/api/calendar/${action.payload.calendarId}`, action.payload);
    }catch(error){
        console.log('Error adding a user to calendar', error);
    }
}

function* createCalendar() {
    try {
        yield axios.post('/api/calendar');
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch(error){
        console.log('Error creating new calendar', error);
    }
}

function deleteCalendar() {
    try{
        yield axios.delete('/api/calendar');
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch(error) {
        console.log('Error deleting calendar', error);
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