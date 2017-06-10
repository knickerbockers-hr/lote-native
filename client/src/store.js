import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/index';

let defaultState = {}; // we need a reducer for each state

const logger = createLogger({ predicate: (getState, action) => __DEV__});

const enhancer = compose(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, defaultState, enhancer);

export default store;
