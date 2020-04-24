import { combineReducers } from 'redux'

// Reducers
import ApiRootReducer from './apiRootReducer';
import AppReducer from './AppReducer';


const rootReducer = combineReducers({api: ApiRootReducer, app: AppReducer})

export default rootReducer;