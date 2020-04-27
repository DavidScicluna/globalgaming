import * as actionType from '../actionTypes/actionTypes';

const getUsers = JSON.parse(localStorage.getItem('users') || '[]');
const getUser = JSON.parse(localStorage.getItem('user') || '{}');

const initialState = {
    openSignDialog: true,
    openSearchDialog: false,
    openCustomizeDialog: false,
    gridPreviewApiCategory: '',
    gridPreviewApiType: '',
    gridPreviewApiTitle: '',
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
        case actionType.SET_OPENCUSTOMIZEDIALOG:
            return {
                ...state,
                openCustomizeDialog: action.payload
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
        case actionType.SET_GRIDPREVIEWAPITITLE:
            return {
                ...state,
                gridPreviewApiTitle: action.payload,
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