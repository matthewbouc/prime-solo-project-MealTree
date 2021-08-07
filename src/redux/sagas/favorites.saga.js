import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* favoritesSaga() {
    yield takeLatest('GET_FAVORITES_LIST', getFavorites);
}

// worker Saga: will be fired on "FETCH_USER" actions
function* getFavorites() {
    try {
      const favoritesList = yield axios.get('/api/recipes');
      yield put({type: 'SET_FAVORITES_LIST', payload: favoritesList.data});
    } catch (error) {
        console.log('Error GETting or SETting reducer', error);
    }
}

export default favoritesSaga;