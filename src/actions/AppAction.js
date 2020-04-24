import * as actionType from '../actionTypes/actionTypes';

export const setOpenSignDialog = (bool) => {
    return {
        type: actionType.SET_OPENSIGNDIALOG,
        payload: bool
    }
};

export const setOpenSearchDialog = (bool) => {
    return {
        type: actionType.SET_OPENSEARCHDIALOG,
        payload: bool
    }
};

export const setUsers = (users) => {
    return {
        type: actionType.SET_USERS,
        payload: users
    }
};

export const setUser = (user) => {
    return {
        type: actionType.SET_USER,
        payload: user
    }
};