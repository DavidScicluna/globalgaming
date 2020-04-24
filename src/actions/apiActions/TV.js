import * as actionType from '../../actionTypes/actionTypes';

export const fetchApiTVAiringToday = (data) => {
    return {
        type: actionType.FETCH_API_TV_AIRINGTODAY,
        payload: data
    }
};

export const fetchApiTVOnTv= (data) => {
    return {
        type: actionType.FETCH_API_TV_ONTV,
        payload: data
    }
};

export const fetchApiTVPopular = (data) => {
    return {
        type: actionType.FETCH_API_TV_POPULAR,
        payload: data
    }
};

export const fetchApiTVTopRated = (data) => {
    return {
        type: actionType.FETCH_API_TV_TOPRATED,
        payload: data
    }
};

export const fetchApiTVGenres = (data) => {
    return {
        type: actionType.FETCH_API_TV_GENRES,
        payload: data
    }
};