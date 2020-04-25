import * as actionType from '../actionTypes/actionTypes';

const getUsers = JSON.parse(localStorage.getItem("users") || "[]");
const getUser = JSON.parse(localStorage.getItem("users") || "{}");

const initialState = {
    openSignDialog: false,
    openSearchDialog: false,
    gridPreviewApiCategory: '',
    gridPreviewApiType: '',
    users: getUsers,
    user: getUser
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.SET_OPENSIGNDIALOG:
            return {
                ...state,
                openSignDialog: action.payload
            }
        case actionType.SET_OPENSEARCHDIALOG:
            return {
                ...state,
                openSearchDialog: action.payload
            }
        case actionType.SET_GRIDPREVIEWAPICATEGORY:
            return {
                ...state,
                gridPreviewApiCategory: action.payload,
            }
        case actionType.SET_GRIDPREVIEWAPITYPE:
            return {
                ...state,
                gridPreviewApiType: action.payload,
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

export default appReducer;