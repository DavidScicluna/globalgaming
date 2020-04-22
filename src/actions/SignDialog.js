import * as actionType from '../actionTypes/actionTypes';

export const setOpenSignDialog = (bool) => {
    console.log(bool);
    return {
        type: actionType.SET_OPENSIGNDIALOG,
        payload: bool
    }
};