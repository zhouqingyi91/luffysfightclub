import { configureStore } from '@reduxjs/toolkit';
import { galleryImgDataReducer } from './galleryImgDataSlice';
import { slideshowReducer } from './slideshowSlice';
import { slideIndexReducer } from './slideIndexSlice';
import { slideshowLastStatusReducer } from './slideshowLastStatusSlice';
import { mobileNavMenuReducer } from './mobileNavMenuSlice';
import { pageImgDataReducer } from './pageImgDataSlice';


const store = configureStore({
  reducer: {
    slideshow: slideshowReducer,
    galleryImgData: galleryImgDataReducer,
    pageImgData: pageImgDataReducer,
    slideIndex: slideIndexReducer,
    slideshowLastStatus: slideshowLastStatusReducer,
    mobileNavMenu: mobileNavMenuReducer
  }
});

export default store;