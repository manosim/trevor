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
        type: FETCH_GITHUB_TOKEN_FAILURE,
        payload: (action, state, res) => getJSON(res),
        meta: { isPro }
      }]
    }
  };
};
