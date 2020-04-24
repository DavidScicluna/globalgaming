import * as actionType from '../../actionTypes/actionTypes';

const initialState = {
    airingToday: [],
    onTv: [],
    popular: [],
    topRated: [],
    genres: [],
}

const tvReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.FETCH_API_TV_AIRINGTODAY:
            return {
                ...state,
                airingToday: action.payload.results
            }
        case actionType.FETCH_API_TV_ONTV:
            return {
                ...state,
                onTv: action.payload.results
            }
        case actionType.FETCH_API_TV_POPULAR:
            return {
                ...state,
                popular: action.payload.results
            }
        case actionType.FETCH_API_TV_TOPRATED:
            return {
                ...state,
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