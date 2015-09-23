var AsyncStorage = require('react-native').AsyncStorage;

var AuthStore = {
  tokenOs: null,
  tokenPro: null,
  tokenGithub: null,

  setToken: function (key, value) {
    this[key] = value;
  },

  getTravisToken: function (isPro) {
    switch(isPro) {
      case true:
        return this.tokenPro;
      case false:
        return this.tokenOs;
      default:
        return false;
    }
  },

  isLoggedIn: function (isPro) {
    if (isPro) {
      return this.tokenPro !== null;
    } else {
      return this.tokenOs !== null;
    }
  },

  clear: function () {
    try {
      AsyncStorage.clear();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
};

module.exports = AuthStore;
