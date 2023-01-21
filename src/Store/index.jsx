import { configureStore } from '@reduxjs/toolkit';
import { galleryImgDataReducer } from './galleryImgDataSlice';
import { slideshowReducer } from './slideshowSlice';
import { slideIndexReducer } from './slideIndexSlice';
import { slideshowLastStatusReducer } from './slideshowLastStatusSlice';
import { mobileNavMenuReducer } from './mobileNavMenuSlice';


const store = configureStore({
  reducer: {
    slideshow: slideshowReducer,
    galleryImgData: galleryImgDataReducer,
    slideIndex: slideIndexReducer,
    slideshowLastStatus: slideshowLastStatusReducer,
    mobileNavMenu: mobileNavMenuReducer
  }
});

export default store;