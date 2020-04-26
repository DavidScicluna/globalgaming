import * as actionType from '../../actionTypes/actionTypes';

const initialState = {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    genres: [],
    totalPages: 0,
    totalResults: 0,
}

const moviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_MOVIE_NOWPLAYING:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                nowPlaying: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_POPULAR:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                popular: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_TOPRATED:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                topRated: action.payload.results
            }
        case actionType.FETCH_API_MOVIE_UPCOMING:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
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