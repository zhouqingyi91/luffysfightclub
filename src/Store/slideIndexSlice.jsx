import { createSlice } from '@reduxjs/toolkit';

const slideIndexSlice = createSlice({
  name: 'slideIndex',
  initialState: 0,
  reducers: {
    setSlideIndex(state, action) {
      return action.payload;
    }
  }
});

export const { setSlideIndex } = slideIndexSlice.actions;
export const { reducer: slideIndexReducer } = slideIndexSlice;