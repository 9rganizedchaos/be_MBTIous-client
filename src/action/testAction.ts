export const UPDATE_ARTIST = "UPDATE_ARTIST";
export const UPDATE_RESULT = "UPDATE_RESULT";

export const updateArtist = (groupName: string) => {
  return {
    type: UPDATE_ARTIST,
    payload: {
      groupName
    }
  }
}

export const updateResult = (testResult: any) => {
  return {
    type: UPDATE_RESULT,
    payload: {
      testResult
    }
  }
}
