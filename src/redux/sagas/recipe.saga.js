import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* recipeSaga() {
    yield takeLatest('GET_RECIPE_DETAILS', getRecipeDetails);
    yield takeLatest('ADD_NEW_RECIPE', postRecipe);
}

// worker Saga: will be fired on "FETCH_USER" actions
function* getRecipeDetails(action) {
    try {
        console.log('actionpayload', action.payload);
        const recipeDetails = yield axios.get(`/api/recipes?recipeId=${action.payload}`);
        yield put({type: 'SET_RECIPE_DETAILS', payload: recipeDetails.data[0]});
    } catch (error) {
        console.log('Error GETting recipe details', error);
    }
}

function* postRecipe(action){
    try{
        console.log('recipe payload', action.payload);
        yield axios.post(`/api/recipes/new`, action.payload);
    } catch(error) {
        console.log('Error POSTing new recipe', error);
    }
}

export default recipeSaga;