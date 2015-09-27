'use strict';

var React = require('react-native');
var { AsyncStorage } = React;

var AuthStore = {
  tokenOs: undefined,
  tokenPro: undefined,
  tokenGithub: undefined,

  setToken: function (key, value) {
    try {
      AsyncStorage.setItem(key, value);
      this[key] = value;
    } catch (error) {
      console.log('ERROR ERROR ERROR ERROR');
      console.log('ERROR ERROR ERROR ERROR');
      console.log('AsyncStorage error: ' + error.message);
      console.log('ERROR ERROR ERROR ERROR');
      console.log('ERROR ERROR ERROR ERROR');
    }
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
