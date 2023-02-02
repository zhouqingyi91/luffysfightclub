import { createSlice } from '@reduxjs/toolkit';

const pageImgDataSlice = createSlice({
  name: 'imgData',
  initialState: [],
  reducers: {
    setPageImgData(state, action) {
      return action.payload;
    }
  }
});

export const { setPageImgData } = pageImgDataSlice.actions;
export const { reducer: pageImgDataReducer } = pageImgDataSlice;