import React, { useEffect } from 'react';
import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';
import { useDispatch } from 'react-redux';
import { setGalleryImgData } from '../Store/galleryImgDataSlice';

const IMG_DATA = [
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-10-09-DSCF0976.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-10-09-DSCF0971.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-10-09-DSCF0969.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0739.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0715.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0713.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0705.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0673.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0661.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0643.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-09-30-DSCF0637.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-04-02-DSCF6628.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-04-02-DSCF6425.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/22-02-20-DSCF6095.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/portrait/21-08-11-DSCF3463.jpg"
]

const PortraitPage = () => {
  // TODO: fetch image data from S3
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGalleryImgData(IMG_DATA));
  })
  return (
    <GalleryCollection />
  );
};

export default PortraitPage;