import * as actionType from '../actionTypes/actionTypes';

export const fetchApiMovieGenres = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_GENRES,
        payload: data
    }
};

export const fetchApiError = (error) => {
    return {
        type: actionType.FETCH_API_ERROR,
        payload: error
    }
};