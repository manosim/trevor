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

  clear: function () {
    var self = this;

    AsyncStorage.multiRemove(['tokenOs', 'tokenPro']).then(function () {
      self.tokenOs = undefined;
      self.tokenPro = undefined;
      self.eventEmitter.emit('authStateChanged');
    }).done();
  }
};

module.exports = AuthStore;
