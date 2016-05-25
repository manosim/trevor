import { combineReducers } from 'redux';

import accounts from './Accounts';
import auth from './Auth';
import builds from './Builds';
import build from './Build';
import repos from './Repos';

export default combineReducers({
  accounts,
  auth,
  build,
  builds,
  repos
});
