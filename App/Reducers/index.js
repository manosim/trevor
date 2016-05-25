import { combineReducers } from 'redux';

import accounts from './Accounts';
import auth from './Auth';
import builds from './Builds';
import build from './Build';
import log from './Log';
import repos from './Repos';

export default combineReducers({
  accounts,
  auth,
  build,
  builds,
  log,
  repos
});
