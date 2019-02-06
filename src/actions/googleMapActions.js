import * as types from "../constants/types";

export function storeGMapInfo(mapApi, currentMapHandle) {
  return {
    type: types.STORE_GMAP_INFO,
    mapApi: mapApi,
    currentMapHandle: currentMapHandle
  };
}
