import * as actionType from '../../actionTypes/actionTypes';

const initialState = {
    airingToday: [],
    onTv: [],
    popular: [],
    topRated: [],
    genres: [],
    totalPages: 0,
    totalResults: 0,
}

const tvReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_TV_AIRINGTODAY:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                airingToday: action.payload.results
            }
        case actionType.FETCH_API_TV_ONTV:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                onTv: action.payload.results
            }
        case actionType.FETCH_API_TV_POPULAR:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                popular: action.payload.results
            }
        case actionType.FETCH_API_TV_TOPRATED:
            return {
                ...state,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                topRated: action.payload.results
            }
        case actionType.FETCH_API_TV_GENRES:
            return {
                ...state,
                genres: action.payload.genres
            }
        default: 
            return state;
    }
}

export default tvReducer;