import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSlideIndex } from '../../../../Store/slideIndexSlice';
import { displaySlideshow } from '../../../../Store/slideshowSlice';
import css from './OverlayControls.module.css';

const OverlayControls = () => {
  const slideIndex = useSelector(state => state.slideIndex);
  const galleryImgData = useSelector(state => state.galleryImgData);

  const dispatch = useDispatch();

  const prevSlideHandler = () => {
    const newSlideIndex = slideIndex === 0 ? galleryImgData.length - 1 : slideIndex - 1;
    dispatch(setSlideIndex(newSlideIndex));
  }

  const toggleThumbnailHandler = () => {
    dispatch(displaySlideshow(false));
  }

  const nextSlideHandler = () => {
    const newSlideIndex = slideIndex === galleryImgData.length - 1 ? 0 : slideIndex + 1;
    dispatch(setSlideIndex(newSlideIndex));
  }

  return (
    <div>
      <div className={`${css.leftControl} ${css.overlayControls}`} onClick={prevSlideHandler} ></div>
      <div className={`${css.centerControl} ${css.overlayControls}`} onClick={toggleThumbnailHandler} ></div>
      <div className={`${css.rightControl} ${css.overlayControls}`} onClick={nextSlideHandler}></div>
    </div>
  );
};

export default OverlayControls;