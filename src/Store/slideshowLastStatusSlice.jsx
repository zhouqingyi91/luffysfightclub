import { createSlice } from '@reduxjs/toolkit';

const slideshowLastStatusSlice = createSlice({
  name: 'slideshowLastStatus',
  initialState: true,
  reducers: {
    setSlideshowLastStatus(state, action) {
      return action.payload;
    }
  }
});

export const { setSlideshowLastStatus } = slideshowLastStatusSlice.actions;
export const { reducer: slideshowLastStatusReducer } = slideshowLastStatusSlice;