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

export const setOpenCustomizeDialog = (bool) => {
    return {
        type: actionType.SET_OPENCUSTOMIZEDIALOG,
        payload: bool
    }
};

export const setGridPreviewApiCategory = (category) => {
    return {
        type: actionType.SET_GRIDPREVIEWAPICATEGORY,
        payload: category
    }
};

export const setGridPreviewApiType = (type) => {
    return {
        type: actionType.SET_GRIDPREVIEWAPITYPE,
        payload: type
    }
};

export const setGridPreviewApiTitle = (type) => {
    return {
        type: actionType.SET_GRIDPREVIEWAPITITLE,
        payload: type
    }
};

export const setPreview = (item) => {
    return {
        type: actionType.SET_PREVIEW,
        payload: item
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