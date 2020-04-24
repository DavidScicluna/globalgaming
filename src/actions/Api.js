import * as actionType from '../actionTypes/actionTypes';

export const fetchApiError = (error) => {
    return {
        type: actionType.FETCH_API_ERROR,
        payload: error
    }
};