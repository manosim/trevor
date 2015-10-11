'use strict';

var EventEmitter = require('EventEmitter');
var React = require('react-native');
var { AsyncStorage } = React;

var AuthStore = {
  tokenOs: undefined,
  tokenPro: undefined,
  eventEmitter: new EventEmitter(),

  setToken: function (key, value) {
    var self = this;

    AsyncStorage.setItem(key, value).then(function () {
      self[key] = value;
      self.eventEmitter.emit('authStateChanged');
    }).done();
  },

  isLoggedIn: function (isPro) {
    if (isPro) {
      return this.tokenPro !== undefined;
    } else {
      return this.tokenOs !== undefined;
    }
  },

  isEitherLoggedIn: function () {
    return this.tokenOs !== undefined || this.tokenPro !== undefined;
  },

  logOut: function (pro) {
    var self = this;

    var tokenType = pro ? 'tokenPro' : 'tokenOs';

    AsyncStorage.removeItem(tokenType).then(function () {
      self[tokenType] = undefined;
      self.eventEmitter.emit('authStateChanged');
    }).done();
  }
};

module.exports = AuthStore;
