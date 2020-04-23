import * as actionType from '../actionTypes/actionTypes';

const initialState = {
    movies: {
        genres: [],
    },
    error: null
}

const apiReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_MOVIE_GENRES:
            return {
                ...state,
                movies: {
                    ...state.movies, 
                    genres: action.payload.genres
                }
            }
        case actionType.FETCH_API_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default apiReducer;