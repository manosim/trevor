import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  isReFetching: false,
  response: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_BUILD_REQUEST:
      var newState = action.meta.isReFetching ?
        { ...state, isReFetching: true } : { ...state, isFetching: true };

      return newState;
    case actions.FETCH_BUILD_SUCCESS:
      const payload = { build: action.payload.build, commit: action.payload.commit, jobs: action.payload.jobs };
      var newState = action.meta.isReFetching ?
        { ...state, response: payload, isReFetching: false } : { ...state, response: payload, isFetching: false };

      return newState;
    case actions.FETCH_BUILD_FAILURE:
      var newState = action.meta.isReFetching ?
        { ...state, response: {}, isReFetching: false } : { ...state, response: {}, isFetching: false };

      return newState;
    default:
      return state;
  }
};
