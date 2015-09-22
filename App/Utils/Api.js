var Api = {
  getGithubToken: function (data) {
    var url = 'https://github.com/login/oauth/access_token';
    return fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function(error) {
      console.warn('Request Failed: ', error)
    });
  },

  getTravisToken: function (data) {
    var url = 'https://api.travis-ci.org/auth/github';
    return fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function(error) {
      console.warn('Request Failed: ', error)
    });
  },
};

module.exports = Api;
