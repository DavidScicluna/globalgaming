import * as actionType from '../actionTypes/actionTypes';

const getUsers = JSON.parse(localStorage.getItem("users") || "[]");
const getUser = JSON.parse(localStorage.getItem("users") || "{}");

const initialState = {
    openSignDialog: true,
    users: getUsers,
    user: getUser
}

const signDialogReducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.SET_OPENSIGNDIALOG:
            return {
                ...state,
                openSignDialog: action.payload
            }
        case actionType.SET_USERS:
            return {
                ...state,
                users: action.payload
            } 
        case actionType.SET_USER:
            return {
                ...state,
                user: action.payload
            } 
        default:
            return state;
    }
}

export default signDialogReducer;