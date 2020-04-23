import * as actionType from '../actionTypes/actionTypes';

const getUsers = JSON.parse(localStorage.getItem("users") || "[]");
const getUser = JSON.parse(localStorage.getItem("users") || "{}");

const initalState = {
    openSignDialog: true,
    users: getUsers,
    user: getUser
}

const reducers = (state = initalState, action) => {
    switch(action.type){
        case actionType.SET_OPENSIGNDIALOG:
            return Object.assign({}, state, {openSignDialog: action.payload})
        case actionType.SET_USERS:
            return Object.assign({}, state, {users: action.payload})
        case actionType.SET_USER:
            return Object.assign({}, state, {user: action.payload})
        default:
            return state;
    }
}

export default reducers;