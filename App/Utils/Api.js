var React = require('react-native');
var AuthStore = require('../Stores/Auth');

var Api = {
  getApiUrl: function (isPro) {
    if (isPro) {
      return 'https://api.travis-ci.com';
    } else {
      return 'https://api.travis-ci.org';
    }
  },

  getGithubToken: function (data) {
    var url = 'https://github.com/login/oauth/access_token';
    return fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function(error) {
      console.warn('Request Failed: ', error);
    });
  },

  getTravisToken: function (data, isPro) {
    var url = this.getApiUrl(isPro) + '/auth/github';

    return fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function(error) {
      console.warn('Request Failed: ', error);
    });
  },

  getAccounts: function (isPro) {
    var url = this.getApiUrl(isPro) + '/accounts?all=true';
    var token = isPro ? AuthStore.tokenPro : AuthStore.tokenOs;

    return fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function(error) {
      console.warn('Request Failed: ', error);
    });
  },

  getRepos: function (username, isPro) {
    var url = this.getApiUrl(isPro) + `/repos/${username}`;
    var token = isPro ? AuthStore.tokenPro : AuthStore.tokenOs;

    return fetch(url, {
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(function(res) {
        return res.json();
      })
      .catch((error) => {
        console.warn('Request Failed: ', error);
      });
  },

  getBuilds: function (slug, isPro) {
    var url = this.getApiUrl(isPro) + `/repos/${slug}/builds`;
    var token = isPro ? AuthStore.tokenPro : AuthStore.tokenOs;

    return fetch(url, {
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(function(res) {
        return res.json();
      })
      .catch((error) => {
        console.warn('Request Failed: ', error);
      });
  }
};

module.exports = Api;
