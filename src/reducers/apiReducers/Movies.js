import * as actionType from '../../actionTypes/actionTypes';

const initialState = {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    genres: [],
}

const moviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_MOVIE_NOWPLAYING:
            return {
                ...state,
                nowPlaying: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_POPULAR:
            return {
                ...state,
                popular: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_TOPRATED:
            return {
                ...state,
                topRated: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_UPCOMING:
            return {
                ...state,
                upcoming: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_GENRES:
            return {
                ...state,
                genres: action.payload.genres
            }
        default: 
            return state;
    }
}

export default moviesReducer;