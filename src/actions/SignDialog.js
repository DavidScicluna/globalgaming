import * as actionType from '../actionTypes/actionTypes';

export const setOpenSignDialog = (bool) => {
    console.log(bool);
    return {
        type: actionType.SET_OPENSIGNDIALOG,
        payload: bool
    }
};

export const setUsers = (users) => {
    console.log(users);
    return {
        type: actionType.SET_USERS,
        payload: users
    }
};

export const setUser = (user) => {
    console.log(user);
    return {
        type: actionType.SET_USER,
        payload: user
    }
};