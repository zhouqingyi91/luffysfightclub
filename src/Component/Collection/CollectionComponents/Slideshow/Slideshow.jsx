import React from 'react';
import { useSelector } from 'react-redux';
import Slide from './Slide/Slide';
import css from './Slideshow.module.css';

const Slideshow = () => {
  // states
  const galleryImgData = useSelector(state => state.galleryImgData);
  const slideIndex = useSelector(state => state.slideIndex);

  return (
    <div id={css.slideshow} >
      {galleryImgData && galleryImgData.map((imgUrl, idx) => {
        return <Slide imgUrl={imgUrl} key={idx} activeSlide={slideIndex === idx} />
      })}
    </div>
  );
};

export default Slideshow;