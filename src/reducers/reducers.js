import * as actionType from '../actionTypes/actionTypes';

const initalState = {
    openSignDialog: true,
}

const reducers = (state = initalState, action) => {
    switch(action.type){
        case actionType.SET_OPENSIGNDIALOG:
            console.log(action)
            return {...state, openSignDialog: !action.open }
        default:
            return state;
    }
}

export default reducers;