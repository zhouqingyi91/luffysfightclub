import { createSlice } from '@reduxjs/toolkit';

const mobileNavMenuSlice = createSlice({
  name: 'mobileNavMenu',
  initialState: false,
  reducers: {
    toggleMobileNavMenu(state, action) {
      return !state;
    }
  }
});

export const { toggleMobileNavMenu } = mobileNavMenuSlice.actions;
export const { reducer: mobileNavMenuReducer } = mobileNavMenuSlice;