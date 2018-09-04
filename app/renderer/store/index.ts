import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as History from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

export const history = History.createHashHistory();

const router = routerMiddleware(history);
let middleArgs = [];

if (isDev) {
  middleArgs = [ thunk, router, logger ];
} else {
  middleArgs = [ thunk, router ];
}

const enhancer = compose(applyMiddleware(...middleArgs));

export function configureStore(initialState: {} = {}) {
  return createStore(connectRouter(history)(rootReducer), initialState, enhancer);
}
