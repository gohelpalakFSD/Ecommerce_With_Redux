
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { UserReducers } from './Reducers/UserReducers';
import { CartReducers } from './Reducers/CartReducers';
import { thunk } from 'redux-thunk'; 

const rootReducer = combineReducers({
    UserReducers,
    CartReducers
})

export const store = createStore(rootReducer,applyMiddleware(thunk));