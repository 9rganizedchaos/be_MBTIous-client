import { initialState } from "./initialState";
import { SELECT_ARTIST } from "../action/testAction"

const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_ARTIST:
    return Object.assign({}, state, {
      favoriteArtist: action.payload.index
    });
    default:
      return state
  }
}

export default testReducer;