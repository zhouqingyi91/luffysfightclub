import React, { useEffect } from 'react';
import PageCollection from '../Component/Collection/PageCollection/PageCollection';
import { fetchImgData } from '../Utils/s3Utils';
import { bucketPathPrefix, homepageAlbum } from '../Constants/S3/S3BucketConst';
import { useDispatch } from 'react-redux';
import { setPageImgData } from '../Store/pageImgDataSlice';

let IMG_DATA = null;
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (IMG_DATA === null) {
      fetchImgData(homepageAlbum)
        .then(res => res.map(({ path }) => ({
          imgUrl: bucketPathPrefix + path,
          path: path.substring(path.indexOf('/') + 1, path.lastIndexOf('.'))
        })))
        .then(imgData => {
          IMG_DATA = imgData;
          dispatch(setPageImgData(IMG_DATA));
        })
    } else {
      dispatch(setPageImgData(IMG_DATA));
    }
  }, [])
  return (
    <PageCollection />
  );
};

export default HomePage;