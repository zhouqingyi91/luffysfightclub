import React, { useEffect, useRef } from 'react';
import Slideshow from '../CollectionComponents/Slideshow/Slideshow';
import OverlayControls from '../CollectionComponents/OverlayControls/OverlayControls';
import Thumbnails from '../CollectionComponents/Thumbnails/Thumbnails';
import css from './GalleryCollection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useElementSize from '../../../Hooks/useElementSize';
import { setSlideshowLastStatus } from '../../../Store/slideshowLastStatusSlice';
import { displaySlideshow } from '../../../Store/slideshowSlice';

const GalleryCollection = () => {

  const dispatch = useDispatch();
  const slideshow = useSelector(state => state.slideshow);
  const slideshowLastStatus = useSelector(state => state.slideshowLastStatus);

  const galleryCollectionEle = useRef();
  const galleryCollectionSize = useElementSize(galleryCollectionEle);

  useEffect(() => {
    if (galleryCollectionSize !== null) {
      if (galleryCollectionSize.width <= 800 && !slideshow) {
        dispatch(setSlideshowLastStatus(slideshow));
        dispatch(displaySlideshow(true));
      } else if (galleryCollectionSize.width > 800 && !slideshowLastStatus) {
        dispatch(displaySlideshow(slideshowLastStatus));
        dispatch(setSlideshowLastStatus(true));
      }
    }
  });

  return (
    <div ref={galleryCollectionEle} id={css.galleryCollection}>
      <div id={css.galleryWrapper} >
        {slideshow && <Slideshow />}
        {slideshow && <OverlayControls />}
        {!slideshow && <Thumbnails />}
      </div>
    </div>
  );
};

export default GalleryCollection;