import { combineReducers } from 'redux';
import * as actionType from '../actionTypes/actionTypes';

// Reducers
import movieReducer from  './apiReducers/Movies';
import tvReducer from  './apiReducers/TV';

const trendingInitialState = {};

const errorInitialState = null;

const trendingReducer = (state = trendingInitialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_TRENDING:
            return action.payload
        default: 
            return state;
    }
}

const errorReducer = (state = errorInitialState, action) => {
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

const apiRootReducer = combineReducers({trending: trendingReducer, movies: movieReducer, tv: tvReducer, error: errorReducer});

export default apiRootReducer;