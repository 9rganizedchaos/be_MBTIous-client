import { initialState } from "./initialState";
import { UPDATE_ARTIST } from "../action/testAction"

const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_ARTIST:
    return Object.assign({}, state, {
      favoriteArtist: action.payload.index
    });
    default:
      return state
  }
}

export default testReducer;