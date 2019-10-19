import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions/index'



export function* initIngredientsSaga (action) {
    const response = yield axios.get('https://burger-project-82894.firebaseio.com/ingredients.json')
    try {
        yield put(actions.setIngredients(response.data))
    }catch(error) {
        yield put(actions.fetchIngredientsFailed())
    }
}