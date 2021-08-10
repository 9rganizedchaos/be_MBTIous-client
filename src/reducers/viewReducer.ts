import { initialState } from "./initialState";
import { UPDATE_COLOR, UPDATE_SETTING_BAR, UPDATE_SIZE } from "../action/viewAction"

const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_COLOR:
    return Object.assign({}, state, {
      color: action.payload.color,
    });

    case UPDATE_SIZE:
      return Object.assign({}, state, {
        view: action.payload.size,
      });
    
    case UPDATE_SETTING_BAR:
      return Object.assign({}, state, {
        settingBar: action.payload.isSettingBarClicked,
      });
  
    default:
      return state
  }
}

export default testReducer;