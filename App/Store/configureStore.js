import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from '../Reducers';

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    apiMiddleware
  )(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
