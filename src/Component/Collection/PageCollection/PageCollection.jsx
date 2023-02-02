import React from 'react';
import { useSelector } from 'react-redux';
import RectImg from '../../Responsive/RectImg';
import css from './PageCollection.module.css';


const PageCollection = (props) => {

  // states
  const pageImgData = useSelector(state => state.pageImgData);

  return (
    <div className={css.pageCollection}>
      {pageImgData.map(({ imgUrl, path }, idx) => <RectImg path={path} imageOverlay={true} imgUrl={imgUrl} key={idx} />)}
    </div>
  );
};

export default PageCollection;