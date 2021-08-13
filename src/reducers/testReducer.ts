import { initialState } from "./initialState";
import { UPDATE_ARTIST, UPDATE_RESULT } from "../action/actions"

const testReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_ARTIST:
    return Object.assign({}, state, {
      favoriteArtist: action.payload.groupName,
    });

    case UPDATE_RESULT:
      return Object.assign({}, state, {
        result: action.payload.testResult,
        favoriteArtist: action.payload.groupName,
      });
  
    default:
      return state
  }
}

export default testReducer;