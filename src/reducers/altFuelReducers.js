import * as types from "../constants/types";

const INITIAL_STATE = {
  isFetching: false,
  fuelStations: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.REQUEST_NEARBY_STATIONS:
      return { ...state, isFetching: true };
    case types.RECEIVE_NEARBY_STATIONS:
      return { ...state, isFetching: false, fuelStationInfo: action.payload };
    default:
      return state;
  }
}
