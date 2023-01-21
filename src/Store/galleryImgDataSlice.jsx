import { createSlice } from '@reduxjs/toolkit';

const galleryImgDataSlice = createSlice({
  name: 'imgData',
  initialState: [],
  reducers: {
    setGalleryImgData(state, action) {
      return action.payload;
    }
  }
});

export const { setGalleryImgData } = galleryImgDataSlice.actions;
export const { reducer: galleryImgDataReducer } = galleryImgDataSlice;