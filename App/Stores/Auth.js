var AsyncStorage = require('react-native').AsyncStorage;

var AuthStore = {
  tokenOs: null,
  tokenPro: null,
  tokenGithub: null,

  setToken: function (key, value) {
    this[key] = value;
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
      this.tokenOs = null;
      this.tokenPro = null;
      this.tokenGithub = null;
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
};

module.exports = AuthStore;
