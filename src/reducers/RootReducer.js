import { combineReducers } from 'redux'

// Reducers
import signDialogReducer from './SignDialog';
import ApiRootReducer from './apiRootReducer';

const rootReducer = combineReducers({api: ApiRootReducer, data: signDialogReducer})

export default rootReducer;