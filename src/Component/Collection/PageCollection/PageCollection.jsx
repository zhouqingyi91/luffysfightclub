import React from 'react';
import { useSelector } from 'react-redux';
import RectImg from '../../Responsive/RectImg';
import css from './PageCollection.module.css';
import { bucketPathPrefix } from '../../../Constants/S3/S3BucketConst';

const PageCollection = () => {
  // states
  const pageImgData = useSelector(state => state.pageImgData);

  return (
    <div className={css.pageCollection}>
      {pageImgData.map(({ imgName, path }, idx) => <RectImg path={path} imageOverlay={path} imgUrl={bucketPathPrefix + imgName} key={idx} />)}
    </div>
  );
};

export default PageCollection;