import React, { useEffect } from 'react';
import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';
import { useDispatch } from 'react-redux';
import { setGalleryImgData } from '../Store/galleryImgDataSlice';
import { bucketPathPrefix, portraitAlbum } from '../Constants/S3/S3BucketConst';
import { fetchImgData } from '../Utils/s3Utils';

let IMG_DATA = null;

const PortraitPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (IMG_DATA === null) {
      fetchImgData(portraitAlbum)
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

export default PortraitPage;