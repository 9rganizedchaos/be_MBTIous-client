export const SELECT_ARTIST = "SELECT_ARTIST";

export const selectArtist = (index: number) => {
  return {
    type: SELECT_ARTIST,
    payload: {
      index
    }
  }
}
