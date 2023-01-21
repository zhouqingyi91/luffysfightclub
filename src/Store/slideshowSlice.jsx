import { createSlice } from '@reduxjs/toolkit';

const slideshowSlice = createSlice({
  name: 'slideshow',
  initialState: false,
  reducers: {
    displaySlideshow(state, action) {
      return action.payload;
    }
  }
});

export const { displaySlideshow } = slideshowSlice.actions;
export const { reducer: slideshowReducer } = slideshowSlice;