import AuthStore from '../Stores/Auth';

export default {
  getApiUrl(isPro) {
    if (isPro) {
      return 'https://api.travis-ci.com';
    } else {
      return 'https://api.travis-ci.org';
    }
  },

  getGithubToken(data) {
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

  getTravisToken(data, isPro) {
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

  getAccounts(isPro) {
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

  getRepos(username, isPro) {
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

  getBuilds(slug, isPro) {
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
  },

  getBuild(id, isPro) {
    var url = this.getApiUrl(isPro) + `/builds/${id}`;
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

  getLog(jobId, isPro) {
    var url = this.getApiUrl(isPro) + `/jobs/${jobId}/log?cors_hax=true`;
    var token = isPro ? AuthStore.tokenPro : AuthStore.tokenOs;

    return fetch(url, {
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(function(res) {
        console.log(res.status);
        console.log(res.headers.get('location'));
        return res.json();
      })
      .catch((error) => {
        console.warn('Request Failed: ', error);
      });
  },

  getLogFromS3(logId) {

  },

  getLatestPro() {
    var url = this.getApiUrl(true) + `/repos/`;
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
