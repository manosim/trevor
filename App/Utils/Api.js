// import AuthStore from '../Stores/Auth';
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
    const url = this.getApiUrl(isPro) + `/jobs/${jobId}/log?cors_hax=true`;
    const token = isPro ? AuthStore.tokenPro : AuthStore.tokenOs;

    return fetch(url, {
      headers: {
        'Accept': 'Accept: application/vnd.travis-ci.2+json',
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(function(res) {
        if (res.status === 204) {
          const logUrl = res.headers.get('location');
          return {
            url: logUrl,
            isArchived: true
          };
        }
        return res.json();
      })
      .catch((error) => {
        console.warn('Request Failed: ', error);
      });
  },

  getLogFromS3(url) {
    return fetch(url)
      .then(function(res) {
        return res.text();
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
