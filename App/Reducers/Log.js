import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  isArchived: false,
  location: null,
  response: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_LOG_REQUEST:
      return {
        ...state,
        isFetching: true,
        isArchived: false,
        location: null,
        response: null,
      };
    case actions.FETCH_LOG_SUCCESS:
      if (action.payload.location) {
        return {
          ...state,
          isFetching: false,
          isArchived: true,
          location: action.payload.location
        };
      }

      return {
        ...state,
        response: action.payload,
        isFetching: false
      };
    case actions.FETCH_LOG_FAILURE:
      return {
        ...state,
        response: null,
        isFetching: false
      };
    default:
      return state;
  }
};
