'use strict';

var EventEmitter = require('EventEmitter');
var React = require('react-native');
var { AsyncStorage } = React;

var AuthStore = {
  tokenOs: undefined,
  tokenPro: undefined,
  tokenGithub: undefined,
  eventEmitter: new EventEmitter(),

  setToken: function (key, value) {
    var self = this;

    AsyncStorage.setItem(key, value).then(function () {
      self[key] = value;
      self.eventEmitter.emit('loggedIn');
    }).done();
  },

  isLoggedIn: function (isPro) {
    if (isPro) {
      return this.tokenPro !== undefined;
    } else {
      return this.tokenOs !== undefined;
    }
  },

  clear: function () {
    try {
      AsyncStorage.clear();
      this.tokenOs = undefined;
      this.tokenPro = undefined;
      this.tokenGithub = undefined;
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
};

module.exports = AuthStore;
