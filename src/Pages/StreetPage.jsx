import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGalleryImgData } from '../Store/galleryImgDataSlice';
import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';
import { fetchImgData } from '../Utils/s3Utils';
import { bucketPathPrefix, streetAlbum } from '../Constants/S3/S3BucketConst'

let IMG_DATA = null;

const StreetPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (IMG_DATA === null) {
      fetchImgData(streetAlbum)
        .then(res => res.map(({ path }) => bucketPathPrefix + path))
        .then(imgData => {
          IMG_DATA = imgData;
          dispatch(setGalleryImgData(IMG_DATA));
        })
    } else {
      dispatch(setGalleryImgData(IMG_DATA));
    }
  }, [])
  return (
    <GalleryCollection />
  );
};

export default StreetPage;