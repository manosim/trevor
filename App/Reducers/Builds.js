import _ from 'underscore';
import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  isReFetching: false,
  response: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_BUILDS_REQUEST:
      var newState = action.meta.isReFetching ?
        { ...state, isReFetching: true } : { ...state, isFetching: true };

      return newState;
    case actions.FETCH_BUILDS_SUCCESS:
      const builds = _.map(action.payload.builds, function (obj) {
        obj.commit = _.find(action.payload.commits, (value) => obj.commit_id === value.id);;
        return obj;
      });

      var newState = action.meta.isReFetching ?
        { ...state, response: builds, isReFetching: false } : { ...state, response: builds, isFetching: false };

      return newState;
    case actions.FETCH_BUILDS_FAILURE:
      var newState = action.meta.isReFetching ?
        { ...state, response: [], isReFetching: false } : { ...state, response: [], isFetching: false };

      return newState;
    default:
      return state;
  }
};
