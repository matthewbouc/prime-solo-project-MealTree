import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* calendarSaga() {
    yield takeLatest('GET_CALENDAR_LIST', getCalendars);
    yield takeLatest('CREATE_NEW_CALENDAR', createCalendar);
    yield takeLatest('ADD_USER_TO_CALENDAR', addUserCalendar);
    yield takeEvery('DELETE_CALENDAR', deleteCalendar);
    yield takeLatest('SET_NEW_DEFAULT', setDefaultCalendar);
    yield takeLatest('UPDATE_CALENDAR_NAME', setCalendarName);
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

function* deleteCalendar(action) {
    try{
        yield axios.delete(`/api/calendar/delete/${action.payload}`);
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch (error) {
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

function* setDefaultCalendar(action) {
    try{
        yield axios.put(`/api/calendar/default`, {default: action.payload});
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch(error){
        console.log('Error PUTting default calendar');
    }
}

function* setCalendarName(action){
    try{
        yield axios.put(`/api/calendar/${action.payload.id}`, {calendarName: action.payload.name});
        yield put({type: 'GET_CALENDAR_LIST'})
    } catch(error) {
        console.log('Error updating calendar name', error);
    }
}

export default calendarSaga