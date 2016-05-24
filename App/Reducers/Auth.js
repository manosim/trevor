import * as actions from '../Actions';

const initialState = {
  loaded: false,
  isFetching: false,
  token: {
    os: null,
    pro: null,
    github: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESTORE_AUTH:
      console.log(action.state);
      return {
        ...action.state.auth,
        loaded: true
      };
    case actions.FETCH_GITHUB_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FETCH_GITHUB_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: {
          ...state.token,
          github: action.payload.access_token
        }
      };
    case actions.FETCH_GITHUB_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        token: {
          ...state.token,
          github: null
        }
      };
    case actions.FETCH_TRAVIS_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FETCH_TRAVIS_TOKEN_SUCCESS:
      var newState = {...state, isFetching: false};
      newState.token[action.meta.isPro ? 'pro' : 'os'] = action.payload.access_token;
      return newState;
    case actions.FETCH_TRAVIS_TOKEN_FAILURE:
      var newState = {...state, isFetching: false};
      newState.token[action.meta.isPro ? 'pro' : 'os'] = null;
      return newState;
    default:
      return state;
  }
};
