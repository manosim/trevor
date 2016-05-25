import {CALL_API, getJSON} from 'redux-api-middleware';

import Constants from '../Utils/Constants';

const getApiUrl = (isPro) => {
  return isPro ? Constants.API_PRO : Constants.API_OS;
};


// Auth

export const RESTORE_AUTH = 'RESTORE_AUTH';
export function restoreAuth(state) {
  return {
    type: RESTORE_AUTH,
    state
  };
}

export const FETCH_GITHUB_TOKEN_REQUEST = 'FETCH_GITHUB_TOKEN_REQUEST';
export const FETCH_GITHUB_TOKEN_SUCCESS = 'FETCH_GITHUB_TOKEN_SUCCESS';
export const FETCH_GITHUB_TOKEN_FAILURE = 'FETCH_GITHUB_TOKEN_FAILURE';
export function fetchGithubToken(data) {
  return {
    [CALL_API]: {
      endpoint: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data),
      types: [FETCH_GITHUB_TOKEN_REQUEST, {
        type: FETCH_GITHUB_TOKEN_SUCCESS,
        payload: (action, state, res) => getJSON(res)
      }, {
        type: FETCH_GITHUB_TOKEN_FAILURE,
        payload: (action, state, res) => getJSON(res)
      }]
    }
  };
};

export const FETCH_TRAVIS_TOKEN_REQUEST = 'FETCH_TRAVIS_TOKEN_REQUEST';
export const FETCH_TRAVIS_TOKEN_SUCCESS = 'FETCH_TRAVIS_TOKEN_SUCCESS';
export const FETCH_TRAVIS_TOKEN_FAILURE = 'FETCH_TRAVIS_TOKEN_FAILURE';
export function fetchTravisToken(isPro, token) {
  return {
    [CALL_API]: {
      endpoint: getApiUrl(isPro) + '/auth/github',
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        github_token: token
      }),
      types: [FETCH_TRAVIS_TOKEN_REQUEST, {
        type: FETCH_TRAVIS_TOKEN_SUCCESS,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro }
      }, {
        type: FETCH_TRAVIS_TOKEN_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro }
      }]
    }
  };
};


// Accounts

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';
export function fetchAccounts(isPro) {
  return {
    [CALL_API]: {
      endpoint: getApiUrl(isPro) + '/accounts?all=true',
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      },
      types: [{
        type: FETCH_ACCOUNTS_REQUEST,
        meta: { isPro }
      }, {
        type: FETCH_ACCOUNTS_SUCCESS,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro }
      }, {
        type: FETCH_ACCOUNTS_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro }
      }]
    }
  };
};


// Repositories

export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export function fetchRepos(isPro, username, isReFetching = false) {
  return {
    [CALL_API]: {
      endpoint: getApiUrl(isPro) + `/repos/${username}`,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      },
      types: [{
        type: FETCH_REPOS_REQUEST,
        meta: {
          isPro,
          isReFetching
        }
      }, {
        type: FETCH_REPOS_SUCCESS,
        payload: (action, state, res) => getJSON(res),
        meta: {
          isPro,
          isReFetching
        }
      }, {
        type: FETCH_REPOS_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: {
          isPro,
          isReFetching
        }
      }]
    }
  };
};


// Builds

export const FETCH_BUILDS_REQUEST = 'FETCH_BUILDS_REQUEST';
export const FETCH_BUILDS_SUCCESS = 'FETCH_BUILDS_SUCCESS';
export const FETCH_BUILDS_FAILURE = 'FETCH_BUILDS_FAILURE';
export function fetchBuilds(isPro, slug, isReFetching = false) {
  return {
    [CALL_API]: {
      endpoint: getApiUrl(isPro) + `/repos/${slug}/builds`,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      },
      types: [{
        type: FETCH_BUILDS_REQUEST,
        meta: { isPro, isReFetching }
      }, {
        type: FETCH_BUILDS_SUCCESS,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro, isReFetching }
      }, {
        type: FETCH_BUILDS_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro, isReFetching }
      }]
    }
  };
};


// Build

export const FETCH_BUILD_REQUEST = 'FETCH_BUILD_REQUEST';
export const FETCH_BUILD_SUCCESS = 'FETCH_BUILD_SUCCESS';
export const FETCH_BUILD_FAILURE = 'FETCH_BUILD_FAILURE';
export function fetchBuild(isPro, id, isReFetching = false) {
  return {
    [CALL_API]: {
      endpoint: getApiUrl(isPro) + `/builds/${id}`,
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Content-Type': 'application/json'
      },
      types: [{
        type: FETCH_BUILD_REQUEST,
        meta: { isPro, isReFetching }
      }, {
        type: FETCH_BUILD_SUCCESS,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro, isReFetching }
      }, {
        type: FETCH_BUILD_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro, isReFetching }
      }]
    }
  };
};
