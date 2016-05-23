import EventEmitter from 'EventEmitter';

import { AsyncStorage } from 'react-native';

export default {
  tokenOs: undefined,
  tokenPro: undefined,
  eventEmitter: new EventEmitter(),

  setToken(key, value) {
    var self = this;

    AsyncStorage.setItem(key, value).then(function () {
      self[key] = value;
      self.eventEmitter.emit('authStateChanged');
    }).done();
  },

  isLoggedIn(isPro) {
    if (isPro) {
      return this.tokenPro !== undefined;
    } else {
      return this.tokenOs !== undefined;
    }
  },

  isEitherLoggedIn() {
    return this.tokenOs !== undefined || this.tokenPro !== undefined;
  },

  logOut(pro) {
    var self = this;

    var tokenType = pro ? 'tokenPro' : 'tokenOs';

    AsyncStorage.removeItem(tokenType).then(function () {
      self[tokenType] = undefined;
      self.eventEmitter.emit('authStateChanged');
    }).done();
  }
};
