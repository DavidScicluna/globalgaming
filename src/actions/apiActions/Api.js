import * as actionType from '../../actionTypes/actionTypes';

export const fetchApiTrending = (data) => {
    return {
        type: actionType.FETCH_API_TRENDING,
        payload: data
    }
};

export const fetchApiError = (error) => {
    return {
        type: actionType.FETCH_API_ERROR,
        payload: error
    }
};