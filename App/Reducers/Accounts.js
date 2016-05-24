import * as actions from '../Actions';

const initialState = {
  isFetching: false,
  os: [],
  pro: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FETCH_ACCOUNTS_SUCCESS:
      const type = action.meta.isPro ? 'pro' : 'os';
      const newState = {
        ...state,
        isFetching: false,
      };
      newState[type] = action.payload.accounts;
      return newState;
    case actions.FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        os: [],
        pro: []
      };
    default:
      return state;
  }
};
