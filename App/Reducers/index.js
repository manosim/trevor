import { combineReducers } from 'redux';
import accounts from './Accounts';
import auth from './Auth';

export default combineReducers({
  accounts,
  auth
});
