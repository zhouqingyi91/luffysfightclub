import React from 'react';
import RectImg from '../../Responsive/RectImg';
import css from './PageCollection.module.css';


const PageCollection = (props) => {
  return (
    <div className={css.pageCollection}>
      <RectImg path='street' imageOverlay={true} imgUrl="https://luffysfightclub.s3.us-west-2.amazonaws.com/homepage/street.jpg" />
      <RectImg path='portrait' imageOverlay={true} imgUrl="https://luffysfightclub.s3.us-west-2.amazonaws.com/homepage/portrait.jpg" />
    </div>
  );
};

export default PageCollection;