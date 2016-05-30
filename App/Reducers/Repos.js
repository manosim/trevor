import _ from 'underscore';
import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  isReFetching: false,
  response: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_REPOS_REQUEST:
      var newState = action.meta.isReFetching ?
        { ...state, isReFetching: true } : { ...state, isFetching: true };

      return newState;
    case actions.FETCH_REPOS_SUCCESS:
      const repos = _.filter(action.payload.repos, (obj) => obj.active === true);
      var newState = action.meta.isReFetching ?
        { ...state, response: repos, isReFetching: false } : { ...state, response: repos, isFetching: false };

      return newState;
    case actions.FETCH_REPOS_FAILURE:
      var newState = action.meta.isReFetching ?
        { ...state, response: [], isReFetching: false } : { ...state, response: [], isFetching: false };

      return newState;
    default:
      return state;
  }
};
