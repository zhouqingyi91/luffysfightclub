import { createSlice } from '@reduxjs/toolkit';

const albumPhotosSlice = createSlice({
  name: 'albumPhotos',
  initialState: [],
  reducers: {
    setAlbumPhotos(state, action) {
      return action.payload;
    },
    removeAlbumPhoto(state, action) {
      return state.filter((item, idx) => idx !== action.payload);
    }
  }
});

export const { setAlbumPhotos, removeAlbumPhoto } = albumPhotosSlice.actions;
export const { reducer: albumPhotosReducer } = albumPhotosSlice;