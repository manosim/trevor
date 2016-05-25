const AuthStore = {

};

export default {
  getApiUrl(isPro) {
    if (isPro) {
      return 'https://api.travis-ci.com';
    } else {
      return 'https://api.travis-ci.org';
    }
  },

  searchPublicRepos(keywords) {
    var url = this.getApiUrl(false) + '/repos?orderBy=name&active=true';
    url = keywords ? url + `/&search=${keywords}` : url;

    return fetch(url, {
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
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

  getLatestPro() {
    var url = this.getApiUrl(true) + '/repos/';
    var token = AuthStore.tokenPro;

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
