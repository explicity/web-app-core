import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const middlewares = [sagaMiddleware, loggerMiddleware];

const composeEnhancers = composeWithDevTools || compose;
const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  // @ts-ignore
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);
