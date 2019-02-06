import * as types from "../constants/types";

const INITIAL_STATE = {
  gMapApi: undefined,
  currentMapHandle: undefined
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.STORE_GMAP_INFO:
      return {
        ...state,
        gMapApi: action.mapApi,
        currentMapHandle: action.currentMapHandle
      };

    default:
      return state;
  }
}
