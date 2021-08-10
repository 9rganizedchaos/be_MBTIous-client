export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_SIZE = "UPDATE_SIZE";
export const UPDATE_SETTING_BAR = "UPDATE_SETTING_BAR";

export const updateColor = (color: string) => {
  return {
    type: UPDATE_COLOR,
    payload: {
      color
    }
  }
}

export const updateSize = (size: any) => {
  return {
    type: UPDATE_SIZE,
    payload: {
      size
    }
  }
}

export const updateSettingBar = (isSettingBarClicked: any) => {
  return {
    type: UPDATE_SETTING_BAR,
    payload: {
      isSettingBarClicked
    }
  }
}