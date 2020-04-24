import * as actionType from '../../actionTypes/actionTypes';

export const fetchApiMovieNowPlaying = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_NOWPLAYING,
        payload: data
    }
};

export const fetchApiMoviePopular = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_POPULAR,
        payload: data
    }
};

export const fetchApiMovieTopRated = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_TOPRATED,
        payload: data
    }
};

export const fetchApiMovieUpcoming = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_UPCOMING,
        payload: data
    }
};

export const fetchApiMovieGenres = (data) => {
    return {
        type: actionType.FETCH_API_MOVIE_GENRES,
        payload: data
    }
};