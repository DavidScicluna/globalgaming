import { combineReducers } from 'redux'

// Reducers
import signDialogReducer from './SignDialog';
import apiReducer from './Api';

const rootReducer = combineReducers({api: apiReducer, data: signDialogReducer})

export default rootReducer;