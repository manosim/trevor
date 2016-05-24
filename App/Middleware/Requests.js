import { CALL_API, isRSAA } from 'redux-api-middleware';
import { FETCH_ACCOUNTS_REQUEST, FETCH_REPOS_REQUEST } from '../Actions';

export default store => next => action => {
  if (!isRSAA(action)) {
    return next(action);
  }

  switch (action[CALL_API].types[0].type) {
    case FETCH_ACCOUNTS_REQUEST:
    case FETCH_REPOS_REQUEST:
      const type = action[CALL_API].types[0].meta.isPro ? 'pro' : 'os';
      const token = 'token ' + store.getState().auth.token[type];
      console.log('TOKEN: ', token);
      action[CALL_API].headers['Authorization'] = token;
      break;
  }

  return next(action);
};
