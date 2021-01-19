import { combineReducers } from 'redux';

import AppReducer from './reducer';

const rootReducer = combineReducers({
    appReducer: AppReducer,
});

export default rootReducer