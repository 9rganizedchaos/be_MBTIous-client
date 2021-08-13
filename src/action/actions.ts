// Test Action
export const UPDATE_ARTIST = "UPDATE_ARTIST";
export const UPDATE_RESULT = "UPDATE_RESULT";

//View Action
export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_SIZE = "UPDATE_SIZE";
export const UPDATE_SETTING_BAR = "UPDATE_SETTING_BAR";

// Action Creators
export const updateArtist = (groupName: string) => {
  return {
    type: UPDATE_ARTIST,
    payload: {
      groupName
    }
  }
}

export const updateResult = (testResult: any, groupName: any) => {
  return {
    type: UPDATE_RESULT,
    payload: {
      testResult,
      groupName
    }
  }
}

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