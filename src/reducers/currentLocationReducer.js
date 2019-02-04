import * as types from "../constants/types";

const INITIAL_STATE = {
  isFetching: false,
  currentLocation: { latitude: 0, longitude: 0 }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.REQUEST_CURRENT_LOCATION:
      return { ...state, isFetching: true };
    case types.RECEIVE_CURRENT_LOCATION:
      return {
        ...state,
        isFetching: false,
        currentLocation: action.payload
      };
    default:
      return state;
  }
}
