import _ from 'underscore';
import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  response: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_REPOS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FETCH_REPOS_SUCCESS:
      const repos = _.filter(action.payload.repos, (obj) => obj.active === true);

      return {
        ...state,
        isFetching: false,
        response: repos
      };
    case actions.FETCH_REPOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: []
      };
    default:
      return state;
  }
};
