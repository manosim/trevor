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
          isArchived: true,
          location: action.payload.location
        };
      }

      console.log('NOT ARCHIVED.');

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
    case actions.FETCH_LOG_ARCHIVED_REQUEST:
      return {
        ...state
      };
    case actions.FETCH_LOG_ARCHIVED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload
      };
    case actions.FETCH_LOG_ARCHIVED_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: null
      };
    default:
      return state;
  }
};
