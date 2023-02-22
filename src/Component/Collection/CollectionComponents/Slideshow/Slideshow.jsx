import React from 'react';
import { useSelector } from 'react-redux';
import Slide from './Slide/Slide';
import css from './Slideshow.module.css';
import { bucketPathPrefix } from '../../../../Constants/S3/S3BucketConst';

const Slideshow = () => {
  // states
  const galleryImgData = useSelector(state => state.galleryImgData);
  const slideIndex = useSelector(state => state.slideIndex);

  return (
    <div id={css.slideshow} >
      {galleryImgData?.map(({ imgName }, idx) => {
        return <Slide imgUrl={bucketPathPrefix + imgName} key={idx} activeSlide={slideIndex === idx} />
      })}
    </div>
  );
};

export default Slideshow;