import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import restaurantReducer from './reducers/restaurantReducer';
import reviewsReducer from './reducers/reviewsReducer';

const rootReducer = combineReducers({
    userReducer,
    restaurantReducer,
    reviewsReducer
});

export default createStore(rootReducer, applyMiddleware(promise));