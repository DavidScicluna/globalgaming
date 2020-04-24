import { combineReducers } from 'redux'
import * as actionType from '../actionTypes/actionTypes';

// Reducers
import movieReducer from  './apiReducers/Movies';
import tvReducer from  './apiReducers/TV';

const initialState = null;

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}

const apiRootReducer = combineReducers({movies: movieReducer, tv: tvReducer, error: errorReducer});

export default apiRootReducer;