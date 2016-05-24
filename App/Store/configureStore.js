import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter';

import { FETCH_TRAVIS_TOKEN_SUCCESS, restoreAuth } from '../Actions';
import Constants from '../Utils/Constants';
import rootReducer from '../Reducers';

const engine = filter(createEngine(Constants.STORAGE_KEY), ['auth']);
const storeMiddleware = storage.createMiddleware(engine, [], [FETCH_TRAVIS_TOKEN_SUCCESS]);
const middlewares = [apiMiddleware, storeMiddleware];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(initialState) {
  let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  const load = storage.createLoader(engine);
  load(store)
    .then((newState) => {
      console.log('Loaded state:', newState);
      store.dispatch(restoreAuth(newState));
    })
    .catch(() => console.log('Failed to load previous state'));

  return store;
};
