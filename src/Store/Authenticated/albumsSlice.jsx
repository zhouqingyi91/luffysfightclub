import { createSlice } from '@reduxjs/toolkit';

const albumsSlice = createSlice({
  name: 'albums',
  initialState: [],
  reducers: {
    setAlbums(state, action) {
      return action.payload;
    },
    addAlbum(state, action) {
      return [action.payload, ...state];
    },
    removeAlbum(state, action) {
      return state.filter((item, idx) => idx !== action.payload);
    }
  }
});

export const { setAlbums, addAlbum, removeAlbum } = albumsSlice.actions;
export const { reducer: albumsReducer } = albumsSlice;