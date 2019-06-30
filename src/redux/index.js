import { createStore, applyMiddleware, combineReducers } from 'redux';

/* Packages */
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

/* Reducers */
import questions from './questions'

const middlewares = [thunk];

if (__DEV__) { //Include logger only in dev builds.
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error //Only show errors as non collapsed logs
  });

  middlewares.push(logger);
};

const store = createStore(
  combineReducers({
    questions,
  }),
  applyMiddleware(...middlewares)
);

export default () => store;
