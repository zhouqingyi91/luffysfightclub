import React from 'react';
import css from './Slide.module.css';

const Slide = ({ activeSlide, imgUrl }) => {
  return (
    <div className={`${css.slide} ${activeSlide ? css.activeSlide : ""}`}>
      <img src={imgUrl} alt="luffysfightclub" />
    </div>
  );
};

export default Slide;