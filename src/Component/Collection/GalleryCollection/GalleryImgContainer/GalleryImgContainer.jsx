import React from 'react';
import css from './GalleryImgContainer.module.css';

const GalleryImgContainer = ({ goToSlide, top, left, width, imgUrl }) => {

  return (
    <div onClick={goToSlide} className={css.container} style={{ top, left, width, height: width }}>
      <img src={imgUrl} alt='luffysfightclub' />
    </div>

  );
};

export default GalleryImgContainer;