import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useElementSize from '../../../../Hooks/useElementSize';
import GalleryImgContainer from '../../GalleryCollection/GalleryImgContainer/GalleryImgContainer';
import css from './Thumbnails.module.css';
import { setSlideIndex } from '../../../../Store/slideIndexSlice';
import { displaySlideshow } from '../../../../Store/slideshowSlice';

const Thumbnails = () => {

  const thumbnailsEle = useRef(null);
  const size = useElementSize(thumbnailsEle);

  // states
  const galleryImgData = useSelector(state => state.galleryImgData);

  const dispatch = useDispatch();

  const goToSlideHandler = (idx) => {
    dispatch(displaySlideshow(true));
    dispatch(setSlideIndex(idx));
  };

  const dynamicPosition = (size) => {
    const gap = 10;
    const totalWidth = size.width;
    const numOfImgPerRow = Math.floor(totalWidth / 312);
    const imgWidth = Math.floor((totalWidth - (numOfImgPerRow - 1) * gap) / numOfImgPerRow);
    let rowNumber = 0;
    thumbnailsEle.current.style.height = Math.ceil(galleryImgData.length / numOfImgPerRow) * (gap + imgWidth) - gap + 'px';
    return galleryImgData.map((url, idx) => {
      const top = rowNumber * (imgWidth + gap);
      const left = (idx % numOfImgPerRow) * (imgWidth + gap);
      if ((idx + 1) % numOfImgPerRow === 0) {
        rowNumber += 1;
      }
      return <GalleryImgContainer goToSlide={() => goToSlideHandler(idx)} imgUrl={url} key={idx} top={top} left={left} width={imgWidth} />
    });
  };

  return (
    <div ref={thumbnailsEle} id={css.thumbnails} >
      {size && dynamicPosition(size)}
    </div >
  );
};

export default Thumbnails;